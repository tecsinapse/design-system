# cortex-native (Uniwind RN package) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build `@tecsinapse/cortex-native` — a new React Native package that unifies react-core + react-native-kit + react-charts on Uniwind (Tailwind v4), inheriting tokens and `tv()` recipes from cortex-core, then deprecate the legacy emotion packages and remove react-web-kit.

**Architecture:** cortex-native is a rollup/tsc package (same shape as cortex-react) that renders RN components using Tailwind `className` strings. Tokens come from a shared `tokens.css` extracted from cortex-core's `default.css` (`@theme` block), compiled for native by Uniwind's Metro plugin inside consumer apps (rn-playground). Component variants reuse cortex-core's `tv()` recipes where they exist. No emotion imports anywhere in the new package. Dark mode uses `useColorScheme`-driven Uniwind CSS theming (no DOM `data-theme`).

**Tech Stack:** Uniwind 1.x (Metro plugin only, no Babel preset), Tailwind CSS v4.3+, tailwind-variants 3.3.1 (catalog), react-native 0.86 / Expo SDK 57, date-fns v4, react-native-svg (PieChart).

## Global Constraints

- RN-only (iOS/Android). No react-native-web support in cortex-native.
- No emotion imports (`@emotion/*`) in cortex-native source — the new package must be emotion-free.
- cortex-native consumes `@tecsinapse/cortex-core` via `workspace:*`; import from package name (root tsconfig maps to `src`), never from `dist`.
- Reuse cortex-core `tv()` recipes (e.g. `buttonStyles`) instead of hand-rolling class strings where a recipe exists; add native-only recipes in `cortex-native/src/styles/` otherwise.
- Tokens/classes reference CSS variables from cortex-core `tokens.css` — never hardcode hex colors in recipes.
- Legacy packages (`react-core`, `react-native-kit`, `react-charts`) are NOT modified except the final deprecation step; all porting reads from them.
- date-fns: use v4 API in cortex-native (legacy packages use v2 — do not copy v2 imports).
- Catalog versions (from root `pnpm-workspace.yaml`): `tailwind-variants` 3.3.1, `clsx` 2.1.1, `currency.js` ~2.0.4, `react-international-phone` ^4.8.0, `react-native-linear-gradient` ~2.8.3, `react-native-vector-icons` ^9.2.0, `tailwindcss` ^4.3.3.
- Peer deps must be declared explicitly (root workspace has `autoInstallPeers: false`).
- New runtime deps must be added to `external` in cortex-native's `rollup.config.mjs`.
- Every task ends with a commit (conventional commit, e.g. `feat(cortex-native): ...`).

---

### Task 1: Extract `tokens.css` from cortex-core and RN-safety audit

**Files:**
- Create: `packages/cortex-core/src/tokens.css`
- Modify: `packages/cortex-core/src/default.css`
- Modify: `packages/cortex-core/rollup.config.mjs` (copy targets)
- Modify: `packages/cortex-core/package.json` (exports map for `./tokens.css`)

**Interfaces:**
- Produces: `@tecsinapse/cortex-core/tokens.css` — platform-agnostic Tailwind 4 `@theme` token block + plain `:root` CSS variables, no `data-theme`/`data-contrast` selectors, no `@import "tailwindcss"`, no `@layer utilities`.
- Consumed by: cortex-core `default.css` (web) and rn-playground global.css (native, via Uniwind).

- [ ] **Step 1: Split the CSS file**

Read `packages/cortex-core/src/default.css` (257 lines). Move into `src/tokens.css`:
- The entire `@theme { ... }` block (lines 52–~240, `--color-*`, `--spacing-*`, `--radius-*`, `--border-width-*`, `--font-*`, `--text-*` + line-heights, `--shadow-*`, `--z-index-*`) and the plain `:root { --color-* }` declarations (lines 3–24) that are RN-safe (colors, spacing, radii, typography, shadows, z-index).
- Keep in `default.css`: `@import "tailwindcss";` (line 1), `:root[data-contrast='black']` (26–28), `:root[data-theme='dark']` (30–50), `@layer utilities` block, and the keyframes `opacity`/`progress` **only if they use web-only syntax** (check: if they are plain `@keyframes` with opacity transforms they are RN-safe — move them to tokens.css; if they reference CSS properties RN doesn't support, leave them in default.css).

`tokens.css` must start with:
```css
:root {
  --color-body: #f8f7f7;
  --color-default: #000;
  /* ...all plain :root vars... */
}

@theme {
  /* ...all @theme vars, verbatim... */
}
```

`default.css` becomes:
```css
@import "tailwindcss";
@import "./tokens.css";

:root[data-contrast='black'] {
  --color-on-primary: #000;
}

:root[data-theme='dark'] {
  /* ...existing dark overrides, verbatim... */
}
```

- [ ] **Step 2: Ship the new asset**

In `packages/cortex-core/rollup.config.mjs` extend the `rollup-plugin-copy` targets to copy both `src/default.css` **and** `src/tokens.css` → `dist/`. In `packages/cortex-core/package.json` add:
```json
"exports": {
  ".": "./dist/esm/index.js",
  "./default.css": "./dist/default.css",
  "./tokens.css": "./dist/tokens.css",
  "./types": "./dist/types/index.d.ts"
}
```
(Keep the existing fields `main`/`module`/`types` untouched — add `exports` for the css entrypoints; verify `files` already includes `dist`.)

- [ ] **Step 3: RN-safety audit of cortex-core**

Grep cortex-core's exported surface for DOM usage:
```bash
grep -rn "document\.\|window\.\|matchMedia" packages/cortex-core/src --include="*.ts*" | grep -v provider/
```
Expected: only `src/provider/DarkThemeContext.tsx` and `src/utils/index.ts` (`updateThemeColors`) touch DOM. Confirm nothing under `src/tokens/`, `src/components/` (tv recipes), or the new `tokens.css` references `document`/`window`. If anything does, move it into the provider/utils (web-only) or out of the shared path.

- [ ] **Step 4: Verify web stack still green**

Run: `pnpm --filter @tecsinapse/cortex-core build:dts` → expect `Done`.
Run: `pnpm --filter @tecsinapse/cortex-react test` → expect 67 suites pass (storybook css imports `default.css` via src path — still valid since default.css re-imports tokens.css).
Run: `pnpm lint:ts` → expect 0 errors.

- [ ] **Step 5: Commit**

```bash
git add packages/cortex-core/src/tokens.css packages/cortex-core/src/default.css packages/cortex-core/rollup.config.mjs packages/cortex-core/package.json
git commit -m "feat(cortex-core): extract RN-safe tokens.css for shared web/native theming"
```

---

### Task 2: Scaffold `packages/cortex-native`

**Files:**
- Create: `packages/cortex-native/package.json`
- Create: `packages/cortex-native/tsconfig.json`
- Create: `packages/cortex-native/tsconfig.build.json`
- Create: `packages/cortex-native/rollup.config.mjs`
- Create: `packages/cortex-native/src/index.ts`
- Create: `packages/cortex-native/AGENTS.md`
- Modify: `pnpm-workspace.yaml` (no change needed — `packages/*` already covers it)

**Interfaces:**
- Produces: package `@tecsinapse/cortex-native` with `dev:es`, `dev:dts`, `build:es`, `build:dts` scripts, empty `src/index.ts` (exported surface fills in as tasks land).
- Produces: `cortex-native/src/styles/index.ts` conventions — see Task 5 (Text exemplar) for the first recipe.

- [ ] **Step 1: package.json**

```json
{
  "name": "@tecsinapse/cortex-native",
  "version": "1.0.0",
  "description": "React Native components based on @tecsinapse/cortex-core, styled with Uniwind (Tailwind v4)",
  "license": "MIT",
  "main": "dist/esm/index.js",
  "module": "dist/esm/index.js",
  "types": "dist/types/index.d.ts",
  "files": ["dist"],
  "scripts": {
    "dev:es": "rollup --config --watch",
    "dev:dts": "tsc --project tsconfig.build.json --watch",
    "build:es": "rollup --config",
    "build:dts": "tsc --project tsconfig.build.json"
  },
  "dependencies": {
    "@tecsinapse/cortex-core": "workspace:*",
    "clsx": "catalog:",
    "country-flag-icons": "^1.6.20",
    "currency.js": "catalog:",
    "date-fns": "^4.4.0",
    "react-international-phone": "catalog:",
    "react-native-linear-gradient": "catalog:",
    "tailwind-variants": "catalog:"
  },
  "peerDependencies": {
    "react": ">=19.0.0",
    "react-native": ">=0.81.0",
    "react-native-safe-area-context": "^4.0.0 || ^5.0.0",
    "react-native-svg": ">=13.0.0",
    "react-native-vector-icons": "catalog:"
  },
  "repository": { "type": "git", "directory": "packages/cortex-native", "url": "git+https://github.com/tecsinapse/design-system.git" },
  "bugs": { "url": "https://github.com/tecsinapse/design-system/issues" },
  "homepage": "https://tecsinapse.github.io/design-system/"
}
```
Note: `uniwind` is intentionally NOT a dependency — it is consumer-side (Metro plugin in the app). `react-native-svg` is peer because only PieChart uses it (legacy pattern: react-charts declares it as peer).

- [ ] **Step 2: tsconfigs**

`tsconfig.json`:
```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "jsx": "react-jsx",
    "types": ["react", "react-native"]
  }
}
```
`tsconfig.build.json` — copy the shape from `packages/cortex-react/tsconfig.build.json` (check it: extends base, `noEmit: false`, `declaration`, `outDir: dist/types`, `rootDir: src`, `exclude: ["src/tests", "docs", "dist"]`).

- [ ] **Step 3: rollup.config.mjs**

Copy `packages/cortex-react/rollup.config.mjs` shape; externals:
```js
external: [
  'react',
  'react-native',
  '@tecsinapse/cortex-core',
  'clsx',
  'currency.js',
  'country-flag-icons',
  'date-fns',
  'react-international-phone',
  'react-native-linear-gradient',
  'react-native-safe-area-context',
  'react-native-svg',
  'react-native-vector-icons',
  'tailwind-variants',
]
```

- [ ] **Step 4: src/index.ts + AGENTS.md**

`src/index.ts` placeholder (fills up as components land):
```ts
export {};
```
Write `AGENTS.md` mirroring cortex-react's structure: layout conventions (`src/components/atoms|molecules`, `src/styles/` recipes, `src/utils/`), the "no emotion" rule, "import styles from cortex-core" rule, build/verify commands, and the Uniwind consumer note (app must set up the Metro plugin + import tokens.css).

- [ ] **Step 5: Verify + commit**

Run: `pnpm --filter @tecsinapse/cortex-native build:dts` and `build:es` → expect success (empty index). Run `pnpm lint:ts` → 0 errors.

```bash
git add packages/cortex-native
git commit -m "feat(cortex-native): scaffold Uniwind-based RN package"
```

---

### Task 3: rn-playground Uniwind setup

**Files:**
- Modify: `packages/rn-playground/metro.config.js`
- Modify: `packages/rn-playground/package.json` (add `uniwind`, `tailwindcss`, `@tailwindcss/postcss` devDeps; keep all existing deps)
- Create: `packages/rn-playground/global.css`
- Modify: `packages/rn-playground/App.tsx` (or entry used by expo) — import the css

**Interfaces:**
- Produces: rn-playground able to render Uniwind `className` on RN components; imports `@tecsinapse/cortex-core/tokens.css` (dev: from `packages/cortex-core/src/tokens.css` via workspace, matching how storybook imports cortex-core css from src).

- [ ] **Step 1: Install tooling**

```bash
pnpm --filter @tecsinapse/rn-playground add -D uniwind@latest tailwindcss@^4.3.3 @tailwindcss/postcss@^4.3.3 --ignore-scripts
```
(`--ignore-scripts` avoids prepare/build churn; run a normal `pnpm install` after all manifest edits.)

- [ ] **Step 2: metro.config.js**

Follow Uniwind docs (v1.x): wrap the config with the Uniwind Metro plugin, e.g.:
```js
const { withUniwindConfig } = require('uniwind/metro');

const config = { /* existing metro config, verbatim */ };

module.exports = withUniwindConfig(config);
```
Verify against the installed Uniwind version's docs (`node_modules/uniwind/docs` or uniwind.dev) — the exact API name (`withUniwindConfig`) is confirmed during this step; if it differs, use the documented one.

- [ ] **Step 3: global.css**

```css
@import "uniwind";
@import "@tecsinapse/cortex-core/tokens.css";
```
In dev, point the second import at the workspace src (the way `.storybook/index.css` imports `cortex-core` css from `src/`) if the package export doesn't resolve through Metro; otherwise use the package path.

- [ ] **Step 4: Import the css in the app entry**

Import `./global.css` at the top of the app entry (`App.tsx` or `index.js` entry).

- [ ] **Step 5: Smoke-test**

Run: `pnpm --filter @tecsinapse/rn-playground run:dev` → Metro starts without plugin errors. Add a temporary `<Text className="text-content-high">hello</Text>` in App.tsx and confirm it renders styled (or, if no device is available, confirm Metro compiles the css through the plugin — no plugin errors in the Metro log).

- [ ] **Step 6: Commit**

```bash
git add packages/rn-playground/metro.config.js packages/rn-playground/global.css packages/rn-playground/package.json
git commit -m "feat(rn-playground): set up Uniwind (Tailwind v4) tooling"
```

---

### Task 4: Validate theme/dark-mode strategy on RN (before component ports)

The design requires RN dark mode without cortex-core's DOM `DarkThemeProvider`. Validate the mechanism early so later component ports target the final theme API.

**Files:**
- Create: `packages/cortex-native/src/provider/ThemeProvider.tsx` (RN-safe, no DOM)
- Modify: `packages/rn-playground/App.tsx` (wrap + toggle demo)

**Interfaces:**
- Produces: `ThemeProvider` for cortex-native — platform-agnostic (props: `theme: 'light' | 'dark'`, `children`; default from `useColorScheme()`), applying the theme via Uniwind CSS theming (CSS variables / class variant per Uniwind 1.x docs) — **no `document`/`window`/`matchMedia`**.

- [ ] **Step 1: Implement ThemeProvider**

Follow Uniwind 1.x theming docs (docs.uniwind.dev — CSS-first themes; the OSS version switches themes without a React context wrapper; if a context is still needed for `data-theme`-style toggling on native, wrap the CSS mechanism in this component). Must compile under the cortex-native tsconfig (no DOM lib usage).
- [ ] **Step 2: Validate in playground**

In rn-playground App.tsx, wrap the app with `ThemeProvider`, add a toggle, and render `<Text className="text-content-high">` + a `bg-primary-medium` View. Toggle light/dark → verify both swap correctly (content/primary tokens from `tokens.css`).
- [ ] **Step 3: Test + commit**

Unit test the provider's default-theme-from-`useColorScheme` logic (mock `useColorScheme`). `build:dts`, `lint` green. Commit `feat(cortex-native): validate RN dark-mode theming via Uniwind`.

---

### Task 5: Port `Text` (exemplar — establishes the porting pattern)

**Files:**
- Create: `packages/cortex-native/src/components/atoms/Text/Text.tsx`
- Create: `packages/cortex-native/src/components/atoms/Text/styled.ts` → recipe file (see Step 2)
- Create: `packages/cortex-native/src/components/atoms/Text/functions.ts` (port of `getLabel`/capitalFirst from legacy `packages/react-core/src/components/atoms/Text/functions.ts`)
- Create: `packages/cortex-native/src/components/atoms/Text/Text.test.ts`
- Modify: `packages/cortex-native/src/index.ts`

**Interfaces:**
- Consumes: legacy `packages/react-core/src/components/atoms/Text/Text.tsx` + `styled.ts` (read-only).
- Produces: `Text` with props `fontColor`, `fontWeight`, `typography`, `fontStack`, `colorVariant`, `colorTone`, `numberOfLines`, `ellipsizeMode`, `textTransform`, `capitalFirst`, `style`, `children`, `testID` — identical to legacy.

**Style mapping (from `packages/react-core/src/components/atoms/Text/styled.ts`):**
| Legacy (theme lookup) | Tailwind class |
|---|---|
| `theme.font.color[fontColor]` (dark/light/inverse/high/medium/low) | `text-content-high`, `text-content-medium`, `text-content-low`, `text-content-minimal`, `text-content-inverse`, `text-inverse` |
| `theme.font.weight[fontWeight]` (thin…black) | `font-thin`, `font-light`, `font-normal`, `font-medium`, `font-semibold`, `font-bold`, `font-extrabold`, `font-black` |
| `theme.typography[typography]` (h1..h5, base, sub, label) | `text-h1` … `text-label` (tokens `--text-h1` … exist in tokens.css) |
| `theme.font.stack[fontStack]` | `font-<stack>` (native: single font family per tokens; RN has no fallbacks) |
| `colorVariant + colorTone` | `text-primary-xlight` … `text-error-xdark` (tokens `--color-*`) |
| `textTransform` | `uppercase`/`lowercase`/`capitalize` (RN supports via textTransform style) |

- [ ] **Step 1: Port the pure function with a failing test**

Copy `functions.ts` from legacy (it computes `getLabel(children, capitalFirst)`). Write `Text.test.ts`:
```ts
import { getLabel } from './functions';

describe('getLabel', () => {
  it('capitalizes the first letter when capitalFirst is true', () => {
    expect(getLabel('hello', true)).toBe('Hello');
  });
  it('keeps the label unchanged when capitalFirst is false', () => {
    expect(getLabel('hello', false)).toBe('hello');
  });
});
```
Run: `pnpm --filter @tecsinapse/cortex-native test` — first create the jest config (preset `react-native`, testMatch `**/*.test.ts{,x}`) + add `"test": "jest"` script to cortex-native package.json. Expected: FAIL (module missing).

- [ ] **Step 2: Implement the recipe + component**

`Text/styled.ts` (native recipe — do NOT hand-copy classes that cortex-core may later own; until then this is the native source):
```ts
import { tv, VariantProps } from 'tailwind-variants';

export const textStyles = tv({
  base: '',
  variants: {
    typography: {
      h1: 'text-h1 leading-h1',
      h2: 'text-h2 leading-h2',
      h3: 'text-h3 leading-h3',
      h4: 'text-h4 leading-h4',
      h5: 'text-h5 leading-h5',
      base: 'text-base leading-base',
      sub: 'text-sub leading-sub',
      label: 'text-label leading-label',
    },
    fontWeight: {
      thin: 'font-thin', light: 'font-light', regular: 'font-normal',
      medium: 'font-medium', semibold: 'font-semibold', bold: 'font-bold',
      extrabold: 'font-extrabold', black: 'font-black',
    },
    fontStack: { default: 'font-default' },
    colorVariant: {
      primary: 'text-primary-medium',
      secondary: 'text-secondary-medium',
      info: 'text-info-medium',
      success: 'text-success-medium',
      warning: 'text-warning-medium',
      error: 'text-error-medium',
    },
  },
  defaultVariants: { typography: 'base', fontWeight: 'regular' },
});
```
(Verify the exact variant keys against `textStyles` needs at implementation time; tone is applied via the `text-<variant>-<tone>` classes when `colorTone` is provided — since Tailwind classes must be static, compose with a small lookup object for the 5 tones × 6 variants, or use the tone as a suffix via a record — implement with a `Record<ColorGradationType, string>` map, never template literals.)

`Text.tsx`:
```tsx
import React from 'react';
import { Text as RNText, StyleProp, TextStyle } from 'react-native';
import { getLabel } from './functions';
import { textStyles } from './styled';

export interface TextProps {
  fontColor?: 'dark' | 'light' | 'inverse' | 'high' | 'medium' | 'low' | 'minimal';
  fontWeight?: 'thin' | 'light' | 'regular' | 'medium' | 'semibold' | 'bold' | 'extrabold' | 'black';
  typography?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'base' | 'sub' | 'label';
  fontStack?: 'default';
  colorVariant?: 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';
  colorTone?: 'xlight' | 'light' | 'medium' | 'dark' | 'xdark';
  numberOfLines?: number;
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
  textTransform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
  capitalFirst?: boolean;
  style?: StyleProp<TextStyle>;
  children?: React.ReactNode;
  testID?: string;
}

const Text: React.FC<TextProps> = ({ children, style, ...rest }) => (
  <RNText className={textStyles({ ...rest })} style={style} {...rest}>
    {getLabel(children, rest.capitalFirst)}
  </RNText>
);

export default Text;
```
Port `fontColor` via the mapping in the style table above (static class map, same tone-record pattern). `className` on RNText works because Uniwind's Metro plugin enables it.

- [ ] **Step 3: Wire tests + index**

`packages/cortex-native/package.json` scripts: add `"test": "jest"`. Create `packages/cortex-native/jest.config.js`:
```js
module.exports = {
  preset: 'react-native',
  rootDir: '../../',
  testMatch: ['<rootDir>/packages/cortex-native/src/**/*.test.ts{,x}'],
};
```
Add `jest` devDep to cortex-native (root already has jest 29). In `src/index.ts`:
```ts
export { default as Text, TextProps } from './components/atoms/Text/Text';
```

- [ ] **Step 4: Verify**

Run: `pnpm --filter @tecsinapse/cortex-native test` → PASS. `pnpm --filter @tecsinapse/cortex-native build:dts` → Done. `pnpm lint:ts` → 0 errors. Add a temporary Text with all variants in rn-playground App.tsx and visually compare with the legacy Text (or defer visual check to Task 6 if no device handy — then note it in the commit).

- [ ] **Step 5: Commit**

```bash
git add packages/cortex-native/src packages/cortex-native/package.json packages/cortex-native/jest.config.js
git commit -m "feat(cortex-native): port Text atom to Uniwind"
```

---

### Task 6: Port `Button` (exemplar 2 — reuse cortex-core recipe)

**Files:**
- Create: `packages/cortex-native/src/components/atoms/Button/Button.tsx`
- Create: `packages/cortex-native/src/components/atoms/Button/Button.test.ts`
- Modify: `packages/cortex-native/src/index.ts`

**Interfaces:**
- Consumes: cortex-core `buttonStyles` (`import { buttonStyles } from '@tecsinapse/cortex-core'`) — the tv recipe already covers intent/variant/size/compound variants.
- Produces: `Button` with legacy-compatible props: `title`, `onPress`, `disabled`, `intent` ('primary'|'secondary'|'success'|'info'|'warning'|'error'), `variant` ('outline'|'text'|'filled'), `size` ('default'|'small'|'square'|'circle'), `loading` (renders ActivityIndicator), `style`, `testID`.

- [ ] **Step 1: Failing test**

Read legacy `packages/react-core/src/components/atoms/Button/Button.tsx` and `styled.ts`. Port the behavior contract: pressing calls `onPress` unless disabled; `loading` shows `ActivityIndicator` and blocks presses; classes come from `buttonStyles({ intent, variant, size })`. Write `Button.test.ts`:
```ts
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Button from './Button';

describe('Button', () => {
  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByRole } = render(<Button title="ok" onPress={onPress} />);
    fireEvent.press(getByRole('button'));
    expect(onPress).toHaveBeenCalled();
  });
  it('does not call onPress when disabled', () => {
    const onPress = jest.fn();
    const { getByRole } = render(<Button title="ok" onPress={onPress} disabled />);
    fireEvent.press(getByRole('button'));
    expect(onPress).not.toHaveBeenCalled();
  });
});
```
Add `@testing-library/react-native` devDep to cortex-native. Expected: FAIL (module missing).

- [ ] **Step 2: Implement**

`Button.tsx`:
```tsx
import React from 'react';
import { Pressable, ActivityIndicator, StyleProp, ViewStyle } from 'react-native';
import { buttonStyles } from '@tecsinapse/cortex-core';
import type { VariantProps } from 'tailwind-variants';

export interface ButtonProps extends VariantProps<typeof buttonStyles> {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

const Button: React.FC<ButtonProps> = ({
  title, onPress, disabled = false, loading = false,
  intent = 'primary', variant = 'filled', size = 'default', style, testID,
}) => (
  <Pressable
    testID={testID}
    accessibilityRole="button"
    disabled={disabled || loading}
    onPress={onPress}
    className={buttonStyles({ intent, variant, size })}
    style={style}
  >
    {loading
      ? <ActivityIndicator color="#fff" />
      : title}
  </Pressable>
);

export default Button;
```
Match legacy `buttonStyles` import style (cortex-react imports recipes from `@tecsinapse/cortex-core`). Verify the `buttonStyles` variant keys match legacy Button's props (intent/variant/size — confirmed present in cortex-core `src/components/button/button.ts`); the legacy `loading` visual (colors, spinner) is copied from legacy Button.tsx behavior.

- [ ] **Step 3: Verify + commit**

Same verification as Task 5 (jest PASS, build:dts Done, lint 0 errors). Export from `src/index.ts`. Render in rn-playground and compare against legacy Button (colors: `bg-primary-medium` for primary vs legacy `theme.color.primary.medium`).

```bash
git add packages/cortex-native/src
git commit -m "feat(cortex-native): port Button atom to Uniwind, reusing cortex-core buttonStyles"
```

---

### Task 7: Port `Icon` (exemplar 3 — react-native-vector-icons)

**Files:**
- Create: `packages/cortex-native/src/components/atoms/Icon/Icon.tsx`
- Create: `packages/cortex-native/src/components/atoms/Icon/utils.ts` (port of `getIconColor` from legacy `packages/react-core/src/components/atoms/Icon/...`)
- Create: `packages/cortex-native/src/components/atoms/Icon/Icon.test.ts`
- Modify: `packages/cortex-native/src/index.ts`

**Interfaces:**
- Consumes: legacy `react-core/src/components/atoms/Icon/Icon.tsx` (uses `react-native-vector-icons` family components + `getIconColor(colorVariant, colorTone, fontColor, theme)`).
- Produces: `Icon` with props `type` ('material-community' etc.), `name`, `size` (spacing tokens), `fontColor`, `colorVariant`, `colorTone`, `style`.

- [ ] **Step 1: Failing test for getIconColor**

Port `getIconColor` to a pure function that takes `(colorVariant, colorTone, fontColor, tokens)` where `tokens` come from cortex-core `tokens/definitions` (colors map — cortex-core exports `colors` in `src/tokens/definitions.ts`). Test:
```ts
import { getIconColor } from './utils';
import { colors } from '@tecsinapse/cortex-core';

describe('getIconColor', () => {
  it('resolves variant+tone colors', () => {
    expect(getIconColor('primary', 'medium', undefined, colors)).toBe('#f89907');
  });
  it('falls back to fontColor', () => {
    expect(getIconColor(undefined, undefined, 'dark', colors)).toBe('#353231');
  });
});
```
Expected: FAIL.

- [ ] **Step 2: Implement**

`Icon.tsx` renders the vector-icon family component with `color={resolvedColor}` and `size` from the size token map (`iconSize` tokens → px values; RN needs numeric sizes, so map token → number via a static record). `className` is not used here — RN vector icons take `color`/`size` props; the token values come from cortex-core `tokens/definitions.ts` (already numeric-friendly). Verify against legacy Icon.tsx prop-for-prop.

- [ ] **Step 3: Verify + commit**

jest PASS, build:dts Done, lint 0 errors. Render in playground vs legacy (same glyph, color, size).

```bash
git add packages/cortex-native/src
git commit -m "feat(cortex-native): port Icon atom to Uniwind"
```

---

### Task 8: Port remaining atoms

For each atom below, follow the **exact task shape from Tasks 4–6**: (1) failing test for any pure logic (extract from legacy), (2) implement component with `className` + recipes (reuse cortex-core `tv()` recipe when one exists — check `packages/cortex-core/src/components/<name>/` — otherwise native recipe in `src/components/<name>/styled.ts`), (3) verify jest/build:dts/lint, (4) visual parity in rn-playground, (5) commit `feat(cortex-native): port <Name>`.

| # | Component | Legacy source (read-only) | Specifics |
|---|---|---|---|
| 7a | Tag | `react-core/src/components/atoms/Tag/` | check cortex-core `tag.ts` recipe; tone maps `bg-<variant>-<tone>` |
| 7b | Badge | `react-core/src/components/atoms/Badge/` | legacy web-kit Badge disabled twMerge — verify no merge needed on RN |
| 7c | Card | `react-core/src/components/atoms/Card/` | elevation/surface tokens: `bg-surface-raised`, `shadow-*`, `rounded-*` |
| 7d | Checkbox | `react-core/src/components/atoms/Checkbox/` | touchable + icon toggling; pressed/disabled states via Pressable classes |
| 7e | RadioButton | `react-core/src/components/atoms/RadioButton/` | same as Checkbox |
| 7f | Switch | `react-core/src/components/atoms/Switch/` | uses `useTheme` + animation (`Switch/animation.ts`) — port animation with RN `Animated` |
| 7g | Divider | `react-core/src/components/atoms/Divider/` | `bg-content-minimal` + `h-px`-style tokens |
| 7h | PressableSurface | `react-core/src/components/atoms/PressableSurface/` | `useTheme` for pressed color; `enabled:active:*` classes |
| 7i | ProgressBar | `react-core/src/components/atoms/ProgressBar/` | width via style prop (dynamic), track/fill colors via classes |
| 7j | Avatar | `react-core/src/components/atoms/Avatar/` | image + initials fallback; `rounded-full` |
| 7k | Paper | `react-core/src/components/atoms/Paper/` | surface + shadow tokens |
| 7l | GroupButton | `react-core/src/components/atoms/GroupButton/` | container + child buttons; `flex-row`, gap tokens |
| 7m | BoxContent | `react-core/src/components/atoms/BoxContent/` | simple wrapper: `p-*`, `bg-*` from props |
| 7n | Skeleton | `react-native-kit/src/components/atoms/Skeleton/` | react-native-linear-gradient wave animation — port `Wave.tsx` (Animated + gradient) with `react-native-linear-gradient` (catalog) |

**Step shape per atom:** read legacy `styled.ts` + component; write the mapping table (like Task 5's); implement; verify; commit. Commit message: `feat(cortex-native): port <Name> atom`.

---

### Task 9: Port molecules — part 1 (wrappers, no date logic)

Same task shape; all from legacy `react-core`/`react-native-kit` (read-only).

| # | Component | Legacy source | Specifics |
|---|---|---|---|
| 8a | HintInputContainer | `react-core/src/components/molecules/HintInputContainer/` | wrapper: `flex-row`, error color tokens |
| 8b | LabeledSwitch | `react-native-kit/src/components/molecules/LabeledSwitch/` | Text + Switch composition |
| 8c | IconTextButton | `react-native-kit/src/components/molecules/IconTextButton/` | Icon + Button |
| 8d | InputPassword | `react-native-kit/src/components/molecules/InputPassword/` | wraps Input + Icon toggle |
| 8e | TextArea | `react-native-kit/src/components/molecules/TextArea/` | multiline Input variant |
| 8f | InputMask | `react-native-kit/src/components/atoms/InputMask/` | react-imask; port with same lib |
| 8g | Grid | `react-native-kit/src/components/molecules/Grid/` | `flex`/gap styles; Row/Col/Item props → classes |
| 8h | Snackbar | `react-core/src/components/molecules/Snackbar/` | context + animated entry (Animated), status colors |

Verify each: jest (logic only), build:dts, lint, playground parity, commit `feat(cortex-native): port <Name>`.

---

### Task 10: Port molecules — part 2 (Input + PhoneInput + Select)

| # | Component | Legacy source | Specifics |
|---|---|---|---|
| 9a | Input | `react-core/src/components/atoms/Input/` + `hooks/useNumberMask.ts` | **mask logic**: port `useNumberMask` + `formatWithMask` (`currency.js`) into `cortex-native/src/utils/` with unit tests (currency formatting cases from legacy); `Input` uses `TextInput` + `className` + `useTheme`-free color tokens |
| 9b | PhoneInput | `react-core/src/components/molecules/PhoneInput/` + `PhoneCountrySelector.tsx` | `react-international-phone` (catalog) + `country-flag-icons`; port `FlagIcon` |
| 9c | Select | `react-native-kit/src/components/molecules/Select/` | Modal + option list; safe-area via `react-native-safe-area-context` (peer) |

Verify each: unit tests for masks/currency/flag logic; build:dts; lint; playground parity; commit.

---

### Task 11: Port molecules — part 3 (Calendar/date-fns v4 migration)

**This task includes the date-fns v2 → v4 migration.** Legacy call sites (from explore research): `react-core/src/components/molecules/Calendar/Calendar.tsx` (`add, format, getWeeksInMonth, set`), `Calendar/components/MonthWeek.tsx` (`compareAsc, isSameDay`), `Weekdays.tsx` (`format`), `DatePicker`/`DateTimePicker` (`format`), `DateTimeSelector` (`getDaysInMonth` etc.), `Selector.tsx`, and `react-native-kit/src/utils/date.ts` (`getLocale` from `date-fns/locale`).

- [ ] **Step 1: Inventory + failing tests**

For each call site, port the logic into `cortex-native/src/utils/date.ts` (v4 imports from `'date-fns'` / `'date-fns/locale'`). Write unit tests for the calendar math the components depend on (e.g. week-grid generation for a known month/year, same-day comparison). Run tests → FAIL until the utils exist.
- [ ] **Step 2: Port components**

| # | Component | Legacy source | Specifics |
|---|---|---|---|
| 10a | Calendar | `react-core/src/components/molecules/Calendar/` | grid + `MonthWeek` + `Weekdays`; uses date utils |
| 10b | DatePicker | `react-core/src/components/molecules/DatePicker/` | `format` for display |
| 10c | DateTimePicker | `react-core` + `react-native-kit` versions | merge both into one native component |
| 10d | DateTimePickerSelector | `react-native-kit/src/components/molecules/DateTimePickerSelector/` + `react-core/.../DateTimeSelector` | `getDaysInMonth` etc. |
| 10e | ScrollableSelector | `react-native-kit/src/components/molecules/ScrollableSelector/` + `DateBlock.tsx` | `getLocale` |
| 10f | SnappingSlider | `react-native-kit/src/components/molecules/SnappingSlider/` | uses `useTheme` from emotion — replace with token record |

- [ ] **Step 3: Verify + commit per component**

Each component: build:dts (catches v2→v4 API drift), jest for date utils, playground parity, commit `feat(cortex-native): port <Name>`.

---

### Task 12: Port molecules — part 4 (Overlay components)

| # | Component | Legacy source | Specifics |
|---|---|---|---|
| 11a | Modal | `react-native-kit/src/components/molecules/Modal/` + `ui/BaseModalView.tsx` | `useSafeAreaInsets()` from `react-native-safe-area-context` (peer); backdrop `bg-black/50`-style tokens |
| 11b | BottomNavigator | `react-native-kit/src/components/atoms/BottomNavigator/` | safe-area bottom inset |
| 11c | Header | `react-native-kit/src/components/atoms/Header/` | getStatusBarHeight → port `IPhoneXHelper` into `cortex-native/src/utils/` (RN-only) with test |
| 11d | Menubar etc. (any remaining RN-kit-only components not listed) | audit `react-native-kit/src/components/` for leftovers after 7–11a | port each with same shape |

Verify + commit per component.

---

### Task 13: Port PieChart (react-charts)

**Files:**
- Create: `packages/cortex-native/src/components/PieChart/PieChart.tsx`, `Dot.tsx`, `Label.tsx`, `styled.ts`, `utils.ts`
- Modify: `packages/cortex-native/src/index.ts`

**Interfaces:**
- Consumes: legacy `packages/react-charts/src/components/PieChart*` (emotion → className) + `react-native-svg` (peer).

- [ ] **Step 1: Port**

Read `react-charts/src/styles/constants.ts` (`fontColor`, `spacing`, `fontStack` etc.) and map to cortex-core tokens (fontStack: single font-family per RN; colors → `--color-*` records). Port PieChart math (`utils.ts`) with unit tests (slice angles for a known dataset). Replace `@emotion/native` styled with `className` on `react-native-svg` primitives (svg components accept `className` under Uniwind — verify in playground; if not, use `style` with token-derived values).
- [ ] **Step 2: Verify + commit**

jest (math), build:dts, lint, playground render with a sample dataset, commit `feat(cortex-native): port PieChart`.

---

### Task 14: Full-surface audit + CI gate

**Files:**
- Modify: `packages/cortex-native/src/index.ts` (final export surface)
- Modify: `.github/workflows/check.yml`
- Modify: root `package.json` scripts if needed

- [ ] **Step 1: Surface parity**

Diff cortex-native exports vs legacy `react-core/src/index.ts` + `react-native-kit/src/index.ts` + `react-charts` exports. Every legacy export must be either ported or explicitly dropped (list dropped ones in the commit message). No emotion imports remain: `grep -rn "@emotion" packages/cortex-native/src` → 0 matches.
- [ ] **Step 2: CI gate**

Add to `check.yml` between install and lint:
```yaml
- name: build cortex-native
  run: pnpm --filter @tecsinapse/cortex-native build:dts && pnpm --filter @tecsinapse/cortex-native test
```
- [ ] **Step 3: Verify + commit**

Full `pnpm test` (cortex-react + cortex-native) green; `pnpm lint:fix` green. Commit `ci: gate cortex-native build and tests`.

---

### Task 15: Deprecate legacy + remove react-web-kit

- [ ] **Step 1: Deprecation notices**

Add `"deprecated": "Moved to @tecsinapse/cortex-native"` to `react-core`, `react-native-kit`, `react-charts` package.json (npm deprecation metadata field). Do NOT change versions (lerna flow handles release).
- [ ] **Step 2: Remove react-web-kit**

Delete `packages/react-web-kit/`; remove references from root `package.json` (none expected), docs (`docs/setup/*.mdx`), and any storybook config that imports it. Verify `pnpm --filter '@tecsinapse/*' run build:dts` still passes for remaining packages.
- [ ] **Step 3: Docs**

Update `docs/setup/` + `AGENTS.md` (root + packages) to describe the new stack: cortex-native + Uniwind setup requirements for consumers (Metro plugin, `@import "@tecsinapse/cortex-core/tokens.css"`).
- [ ] **Step 4: Final verification + commit**

Full suite: `pnpm test`, `pnpm lint:fix`, `pnpm build:storybook` (STORYBOOK_FONT_URL handled by scripts). Commit `refactor(cortex-native): deprecate legacy emotion packages and remove react-web-kit`.

---

## Post-plan notes

- Tasks 5–7 establish the pattern; Tasks 8–13 are repetitions with component-specific mappings (each task's "Specifics" column lists the legacy files and the tokens to use — read the named legacy styled.ts first, write the mapping table into the PR description).
- rn-playground remains the visual verification harness for every ported component.
- Uniwind API names (`withUniwindConfig`, css import syntax) must be confirmed against the installed version's docs in Task 3; the rest of the plan is engine-agnostic (className + tailwind-variants).
