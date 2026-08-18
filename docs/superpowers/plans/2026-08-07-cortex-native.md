# cortex-native (Uniwind RN package) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:
> executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build `@tecsinapse/cortex-native` — a new React Native package that unifies react-core + react-native-kit +
react-charts on Uniwind (Tailwind v4), inheriting tokens and `tv()` recipes from cortex-core, then deprecate the legacy
emotion packages and remove react-web-kit.

> Reviewed 2026-08-14; review amendments applied (see spec "Decisions").

**Architecture:** cortex-native is a rolldown/tsc package (same shape as cortex-core/cortex-react —
`rolldown.config.mjs`, `preserveModules` → `dist/esm`) that renders RN components using Tailwind `className` strings.
Tokens come from two assets extracted from cortex-core's `default.css`: a platform-agnostic `tokens.css` (`:root` +
`@theme` block) and a native-only `tokens-native.css` (dark-theme overrides in Uniwind `@variant dark` syntax), both
compiled for native by Uniwind's Metro plugin inside consumer apps (rn-playground). Component variants reuse
cortex-core's `tv()` recipes where they exist (after validating Uniwind supports the recipe's variants — see Task 6). No
emotion imports anywhere in the new package. Dark mode uses Uniwind's theme registry (`Uniwind.setTheme` / `useUniwind`,
`useColorScheme` for the system default) — no DOM `data-theme`.

**Tech Stack:** Uniwind 1.x (Metro plugin only, no Babel preset; peer + devDep of cortex-native), Tailwind CSS v4.3+,
tailwind-variants 3.3.1 (catalog), react-native 0.86 / Expo SDK 57, date-fns v4, react-native-svg (PieChart), rolldown +
tsc (build), jest + @testing-library/react-native (tests — new RN test stack, see Task 5).

## Global Constraints

- RN-only (iOS/Android). No react-native-web support in cortex-native.
- No emotion imports (`@emotion/*`) in cortex-native source — the new package must be emotion-free.
- cortex-native consumes `@tecsinapse/cortex-core` via `workspace:*`; import from package name (root tsconfig maps to
  `src`), never from `dist`.
- Reuse cortex-core `tv()` recipes (e.g. `buttonStyles`) instead of hand-rolling class strings where a recipe exists;
  add native-only recipes in `cortex-native/src/styles/` otherwise. Recipes contain web-only variants (`hover:*`,
  `cursor-pointer`, `transition`, `active:scale-*`) — validate each reused recipe under Uniwind before adopting it (Task
  6); if a variant breaks or mis-renders, fork a native override in `cortex-native/src/styles/`.
- Tokens/classes reference CSS variables from cortex-core `tokens.css` — never hardcode hex colors in recipes.
  Exception: prop-valued colors (e.g. vector-icon `color`) can't be classes — resolve CSS variables at runtime via
  Uniwind `useCSSVariable`/`getCSSVariable`. Never read cortex-core `tokens/definitions.ts` for this: its color values
  are web `var()` strings that RN cannot evaluate.
- Legacy `RFValue`/`RFValueStr` responsive scaling (react-core `utils/ResponsiveFontSize.ts`, used for ALL legacy
  dimensions) is intentionally NOT ported — Tailwind/Uniwind sizing is fixed. Accepted visual change; document it in the
  migration notes (Task 15).
- `uniwind` is a peerDependency AND devDependency of cortex-native (consumer-owned runtime; devDep provides types so
  `className` type-checks under `build:dts`, and the `Uniwind`/`useUniwind` API for the ThemeProvider).
- Legacy packages (`react-core`, `react-native-kit`, `react-charts`) are NOT modified except the final deprecation step;
  all porting reads from them.
- date-fns: use v4 API in cortex-native (legacy packages use v2 — do not copy v2 imports).
- Catalog versions (from root `pnpm-workspace.yaml`): `tailwind-variants` 3.3.1, `clsx` 2.1.1, `currency.js` ~2.0.4,
  `react-international-phone` ^4.8.0, `react-native-linear-gradient` ~2.8.3, `react-native-vector-icons` ^9.2.0,
  `tailwindcss` ^4.3.3.
- Peer deps must be declared explicitly (root workspace has `autoInstallPeers: false`).
- New runtime deps must be added to `external` in cortex-native's `rolldown.config.mjs`.
- Every task ends with a commit (conventional commit, e.g. `feat(cortex-native): ...`).

---

### Task 1: Extract `tokens.css` from cortex-core and RN-safety audit

**Files:**

- Create: `packages/cortex-core/src/tokens.css`
- Create: `packages/cortex-core/src/tokens-native.css` (dark-theme overrides in Uniwind `@variant dark` syntax)
- Modify: `packages/cortex-core/src/default.css`
- Modify: `packages/cortex-core/rolldown.config.mjs` (copy targets — NOT `rollup.config.mjs`, cortex-core builds with
  rolldown)
- Modify: `packages/cortex-core/package.json` (exports map for `./tokens.css` + `./tokens-native.css`)

**Interfaces:**

- Produces: `@tecsinapse/cortex-core/tokens.css` — platform-agnostic Tailwind 4 `@theme` token block + plain `:root` CSS
  variables, no `data-theme`/`data-contrast` selectors, no `@import "tailwindcss"`, no `@layer utilities`.
- Produces: `@tecsinapse/cortex-core/tokens-native.css` — the dark-theme variable overrides wrapped for Uniwind.
  Imported ONLY by native `global.css` — NEVER by `default.css` (web dark mode stays on `:root[data-theme='dark']`;
  mixing Uniwind's `@variant dark` into the web build would create a second, conflicting dark mechanism).
- Consumed by: cortex-core `default.css` (web) and rn-playground global.css (native, via Uniwind).

- [ ] **Step 1: Split the CSS file**

Read `packages/cortex-core/src/default.css` (257 lines). Move into `src/tokens.css`:

- The plain `:root { --color-* }` declarations (lines 3–24) and the `@theme { ... }` block (lines 52–251: `--color-*`,
  `--spacing-*`, `--radius-*`, `--border-width-*`, `--font-*`, `--text-*` + line-heights, `--shadow-*`, `--z-index-*`,
  `--opacity-*`, `--duration-*`) — EXCEPT the animation/origin entries, which stay web-only (Uniwind free ignores them
  and nothing on native consumes them): `--animate-opacity`, `--animate-progress`, `--transform-origin-left-right`, and
  both `@keyframes` blocks.
- Keep in `default.css`: `@import "tailwindcss";` (line 1), `:root[data-contrast='black']` (26–28),
  `:root[data-theme='dark']` (30–50), the `@layer utilities` block, and a small residual `@theme` holding the
  animation/origin/keyframes entries listed above.

**Order matters:** in `tokens.css` the plain `:root` block MUST come before `@theme`. The `@theme` block contains
self-referencing vars (e.g. `--color-content-high: var(--color-content-high)`) that resolve through cascade order
against the plain `:root` declarations — preserve both blocks verbatim and in this order.

`tokens.css` must start with:

```css
:root {
    --color-body: #f8f7f7;
    --color-default: #000;
    /* ...all plain :root vars... */
}

@theme {
    /* ...all @theme vars except animation/origin/keyframes, verbatim... */
}
```

Create `src/tokens-native.css` with the dark overrides in Uniwind's theme syntax (per Uniwind custom-themes docs;
`light`/`dark` are pre-registered themes, no `extraThemes` needed):

```css
/* Imported ONLY by native (Uniwind) global.css — never by default.css. */
@layer theme {
    :root {
        @variant dark {
            /* ...dark overrides from :root[data-theme='dark'], verbatim... */
        }
    }
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

@theme {
    /* animation/origin vars + keyframes, verbatim */
}

@layer utilities {
    /* ...existing, verbatim... */
}
```

- [ ] **Step 2: Ship the new assets**

In `packages/cortex-core/rolldown.config.mjs` extend the `rollup-plugin-copy` targets to copy `src/default.css`,
`src/tokens.css` **and** `src/tokens-native.css` → `dist/`. In `packages/cortex-core/package.json` add:

```json
"exports": {
".": "./dist/esm/index.js",
"./default.css": "./dist/default.css",
"./tokens.css": "./dist/tokens.css",
"./tokens-native.css": "./dist/tokens-native.css",
"./types": "./dist/types/index.d.ts"
}
```

(Keep the existing fields `main`/`module`/`types` untouched — add `exports` for the css entrypoints; verify `files`
already includes `dist`. Once `exports` exists, only listed subpaths are importable — grep consumers for deep imports of
cortex-core first; the documented css entrypoint `@tecsinapse/cortex-core/default.css` is listed, and storybook/vitest
resolve via `src` aliases, so no breakage is expected. Note for Metro consumers: `./tokens.css` resolves to `dist/`, so
cortex-core must be built — or the app imports the workspace `src` path in dev, see Task 3.)

- [ ] **Step 3: RN-safety audit of cortex-core**

Grep cortex-core's exported surface for DOM usage:

```bash
grep -rn "document\.\|window\.\|matchMedia" packages/cortex-core/src --include="*.ts*" | grep -v provider/
```

Expected: only `src/provider/DarkThemeContext.tsx` and `src/utils/index.ts` (`updateThemeColors`) touch DOM. Confirm
nothing under `src/tokens/`, `src/components/` (tv recipes), or the new `tokens.css` references `document`/`window`. If
anything does, move it into the provider/utils (web-only) or out of the shared path.

- [ ] **Step 4: Verify web stack still green**

Run: `pnpm --filter @tecsinapse/cortex-core build:dts` → expect `Done`.
Run: `pnpm --filter @tecsinapse/cortex-react test` → all existing suites pass (storybook css imports `default.css` via
src path — still valid since default.css re-imports tokens.css).
Run: `pnpm lint:ts` → expect 0 errors.
Visual/cascade check: run storybook and confirm `text-content-high` still renders as `#353231` (light) and flips in dark
mode — this guards the self-referencing `@theme` var cascade (`--color-content-high: var(--color-content-high)`), which
depends on the `:root`-before-`@theme` order in tokens.css.

- [ ] **Step 5: Commit**

```bash
git add packages/cortex-core/src/tokens.css packages/cortex-core/src/tokens-native.css packages/cortex-core/src/default.css packages/cortex-core/rolldown.config.mjs packages/cortex-core/package.json
git commit -m "feat(cortex-core): extract RN-safe tokens.css + tokens-native.css for shared web/native theming"
```

---

### Task 2: Scaffold `packages/cortex-native`

**Files:**

- Create: `packages/cortex-native/package.json`
- Create: `packages/cortex-native/tsconfig.json`
- Create: `packages/cortex-native/tsconfig.build.json`
- Create: `packages/cortex-native/rolldown.config.mjs`
- Create: `packages/cortex-native/src/index.ts`
- Create: `packages/cortex-native/AGENTS.md`
- Modify: `pnpm-workspace.yaml` (add `date-fns: '~4.4.0'` to the catalog — `packages/*` already covers the new package)

**Interfaces:**

- Produces: package `@tecsinapse/cortex-native` with `dev:es`, `dev:dts`, `build:es`, `build:dts` scripts, empty
  `src/index.ts` (exported surface fills in as tasks land).
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
  "react-native": "src/index.ts",
  "types": "dist/types/index.d.ts",
  "files": [
    "dist"
  ],
  "scripts": {
    "dev:es": "rolldown --config --watch",
    "dev:dts": "tsc --project tsconfig.build.json --watch",
    "build:es": "rimraf dist && rolldown --config",
    "build:dts": "tsc --project tsconfig.build.json"
  },
  "dependencies": {
    "@tecsinapse/cortex-core": "workspace:*",
    "clsx": "catalog:",
    "currency.js": "catalog:",
    "date-fns": "catalog:",
    "react-international-phone": "catalog:",
    "react-native-country-flag": "^2.0.2",
    "react-native-linear-gradient": "catalog:",
    "tailwind-variants": "catalog:"
  },
  "devDependencies": {
    "uniwind": "^1.10.0"
  },
  "peerDependencies": {
    "react": ">=19.0.0",
    "react-native": ">=0.86.0",
    "react-native-safe-area-context": "^4.0.0 || ^5.0.0",
    "react-native-svg": ">=15.0.0",
    "react-native-vector-icons": "catalog:",
    "uniwind": "^1.10.0"
  },
  "repository": {
    "type": "git",
    "directory": "packages/cortex-native",
    "url": "git+https://github.com/tecsinapse/design-system.git"
  },
  "bugs": {
    "url": "https://github.com/tecsinapse/design-system/issues"
  },
  "homepage": "https://tecsinapse.github.io/design-system/"
}
```

Notes:

- `uniwind` is peer + devDep (see Global Constraints): consumer-owned runtime, but cortex-native needs its types for
  `className` under `build:dts` and its `Uniwind` API for the ThemeProvider (Task 4).
- `"react-native": "src/index.ts"` — same Metro source-resolution pattern as react-core, so rn-playground bundles the
  raw TS source without needing watch-builds.
- `react-native-country-flag` replaces the spec's `country-flag-icons`: the latter renders DOM SVG (web-only —
  cortex-react uses it); the former is the proven RN flag renderer already used by react-native-kit.
- `date-fns` via catalog: add `date-fns: '~4.4.0'` to the catalog in root `pnpm-workspace.yaml` (this INTRODUCES the v4
  catalog entry — there is no root v4 dep today; legacy `react-core`/`react-web-kit` pin `~2.30.0` directly and stay
  on v2, so the bump is scoped to the new package). cortex-core does NOT consume date-fns and is unaffected. See
  Task 11 for the v2→v4 API breaking-changes checklist.
- `react-native-svg` is peer because only PieChart uses it (legacy pattern: react-charts declares it as peer). Pin
  `>=15.0.0` — Uniwind 1.10 requires SVG primitives v15+ for `className` support used by `withUniwind` (Task 13).
- Build scripts mirror cortex-core (rolldown + rimraf), NOT legacy rollup — cortex-native is a cortex package and is
  picked up by `pnpm dev:cortex`.

- [ ] **Step 2: tsconfigs**

`tsconfig.json`:

```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "jsx": "react-jsx",
    "types": [
      "react",
      "react-native"
    ]
  }
}
```

`tsconfig.build.json` — copy the shape from `packages/cortex-react/tsconfig.build.json` (check it: extends base,
`noEmit: false`, `declaration`, `outDir: dist/types`, `rootDir: src`, `exclude: ["src/tests", "docs", "dist"]`).

- [ ] **Step 3: rolldown.config.mjs**

Copy `packages/cortex-react/rolldown.config.mjs` shape (input `src/index.ts`, `preserveModules` → `dist/esm`);
externals:

```js
external: [
  'react',
  'react-native',
  '@tecsinapse/cortex-core',
  'clsx',
  'currency.js',
  'date-fns',
  'react-international-phone',
  'react-native-country-flag',
  'react-native-linear-gradient',
  'react-native-safe-area-context',
  'react-native-svg',
  'react-native-vector-icons',
  'tailwind-variants',
  'uniwind',
]
```

- [ ] **Step 4: src/index.ts + AGENTS.md**

`src/index.ts` placeholder (fills up as components land):

```ts
export {};
```

Write `AGENTS.md` mirroring cortex-react's structure: layout conventions (`src/components/atoms|molecules`,
`src/styles/` recipes, `src/utils/`), the "no emotion" rule, "import styles from cortex-core" rule, build/verify
commands, and the Uniwind consumer note (app must set up the Metro plugin + import tokens.css).

- [ ] **Step 5: Verify + commit**

Run: `pnpm --filter @tecsinapse/cortex-native build:dts` and `build:es` → expect success (empty index). Run
`pnpm lint:ts` → 0 errors.

```bash
git add packages/cortex-native
git commit -m "feat(cortex-native): scaffold Uniwind-based RN package"
```

---

### Task 3: rn-playground Uniwind setup

**Files:**

- Modify: `packages/rn-playground/metro.config.js`
- Modify: `packages/rn-playground/package.json` (add `uniwind`, `tailwindcss` devDeps + `@tecsinapse/cortex-native` dep;
  keep all existing deps)
- Create: `packages/rn-playground/global.css`
- Modify: `packages/rn-playground/App.tsx` — import the css

**Interfaces:**

- Produces: rn-playground able to render Uniwind `className` on RN components; imports
  `@tecsinapse/cortex-core/tokens.css` + `tokens-native.css` (dev: from `packages/cortex-core/src/` via workspace,
  matching how storybook imports cortex-core css from src).

- [ ] **Step 1: Install tooling**

```bash
pnpm --filter @tecsinapse/rn-playground add -D uniwind@^1.10.0 tailwindcss@^4.3.3 --ignore-scripts
pnpm --filter @tecsinapse/rn-playground add @tecsinapse/cortex-native@workspace:* --ignore-scripts
```

(`--ignore-scripts` avoids prepare/build churn; run a normal `pnpm install` after all manifest edits.
`@tailwindcss/postcss` is NOT needed — that's for PostCSS pipelines, not the Metro plugin.)

- [ ] **Step 2: metro.config.js**

Keep the entire existing config verbatim (storybook generate, nodeModulesPaths, extraNodeModules, sourceExts), add the
cortex-native alias alongside the other package aliases, then wrap with the Uniwind plugin as the OUTERMOST wrapper (API
confirmed against Uniwind 1.x docs — the options argument is required):

```js
const { withUniwindConfig } = require('uniwind/metro');

// ... existing config, plus inside extraNodeModules:
// '@tecsinapse/cortex-native': path.resolve(workspaceRoot, 'packages/cortex-native'),

module.exports = withUniwindConfig(config, {
  cssEntryFile: './global.css',
  dtsFile: './uniwind-types.d.ts', // generated; commit or gitignore per team preference
});
```

- [ ] **Step 3: global.css**

Both tailwindcss and uniwind imports are REQUIRED (per Uniwind quickstart), plus the cortex tokens, plus `@source`
directives — CRITICAL: Tailwind scans for classNames starting from the directory containing global.css, so classes
inside `packages/cortex-native/src` and cortex-core's `tv()` recipes in `packages/cortex-core/src` are NOT detected
without `@source` (components would silently render unstyled):

```css
@import 'tailwindcss';
@import 'uniwind';
@import '@tecsinapse/cortex-core/tokens.css';
@import '@tecsinapse/cortex-core/tokens-native.css';

@source '../cortex-native/src';
@source '../cortex-core/src';
```

In dev, point the two tokens imports at the workspace src (e.g. `../cortex-core/src/tokens.css`, the way
`.storybook/index.css` imports cortex-core css from `src/`) if the package export doesn't resolve through Metro or
`dist/` isn't built; otherwise use the package paths.

- [ ] **Step 4: Import the css in the app entry**

Import `./global.css` at the top of `App.tsx` — NOT in `index.js`: Uniwind docs warn that importing it in the
registration entry triggers full reloads instead of hot reload.

- [ ] **Step 5: Smoke-test**

Run: `pnpm --filter @tecsinapse/rn-playground run:dev` → Metro starts without plugin errors. Add a temporary
`<Text className="text-content-high">hello</Text>` in App.tsx and confirm it renders styled (or, if no device is
available, confirm Metro compiles the css through the plugin — no plugin errors in the Metro log).

- [ ] **Step 6: Commit**

```bash
git add packages/rn-playground/metro.config.js packages/rn-playground/global.css packages/rn-playground/package.json packages/rn-playground/App.tsx
git commit -m "feat(rn-playground): set up Uniwind (Tailwind v4) tooling"
```

---

### Task 4: Validate theme/dark-mode strategy on RN (before component ports)

The design requires RN dark mode without cortex-core's DOM `DarkThemeProvider`. Validate the mechanism early so later
component ports target the final theme API.

**Files:**

- Create: `packages/cortex-native/src/provider/ThemeProvider.tsx` (RN-safe, no DOM)
- Modify: `packages/rn-playground/App.tsx` (wrap + toggle demo)

**Interfaces:**

- Produces: `ThemeProvider` for cortex-native — platform-agnostic (props: `theme?: 'light' | 'dark' | 'system'`,
  `children`; default follows the device via Uniwind's `system` theme), a thin wrapper over Uniwind's theme registry (
  `Uniwind.setTheme(...)`; read state via `useUniwind()`) — **no `document`/`window`/`matchMedia`**. Dark VALUES come
  from `tokens-native.css` (`@variant dark`), imported by the app's global.css in Task 3 — this provider only switches
  the active theme; it does not deliver token values.

- [ ] **Step 1: Implement ThemeProvider**

Follow Uniwind 1.x theming docs (docs.uniwind.dev/theming): themes `light`/`dark`/`system` are pre-registered;
`Uniwind.setTheme('dark')` switches at runtime (it also calls RN's `Appearance.setColorScheme`, keeping native dialogs
in sync); `setTheme('system')` re-enables adaptive mode. Wrap this in the `ThemeProvider` component (context for
prop-driven control + a toggle hook if convenient). Imports `uniwind` (peer). Must compile under the cortex-native
tsconfig (no DOM lib usage).

- [ ] **Step 2: Validate in playground**

In rn-playground App.tsx, wrap the app with `ThemeProvider`, add a toggle, and render RN's bare
`<Text className="text-content-high">` + a `bg-primary-medium` View (do NOT use the cortex-native Text — it isn't
ported yet at this task; this is just Uniwind's className on RN primitives). Toggle light/dark → verify the semantic
tokens swap: `text-content-high` renders `#353231` in light and `#f8f7f7` in dark (values delivered by
`tokens-native.css`'s `@variant dark` block — if the text does not flip, the tokens-native import in global.css is
missing/wrong, NOT the provider). `bg-primary-medium` stays `#f89907` in both (primary is theme-static).

- [ ] **Step 3: Test + commit**

Unit test the provider's `theme` prop handling: `theme='light'` calls `Uniwind.setTheme('light')`,
`theme='dark'` calls `setTheme('dark')`, `theme='system'` (or undefined) calls `setTheme('system')`. Mock the
`uniwind` module (`jest.mock('uniwind', () => ({ Uniwind: { setTheme: jest.fn() } }))`) — RN's `useColorScheme` is
NOT mocked because the provider delegates system detection to Uniwind itself. `build:dts`, `lint` green.
Commit `feat(cortex-native): validate RN dark-mode theming via Uniwind`.

---

### Task 5: Port `Text` (exemplar — establishes the porting pattern)

**Files:**

- Create: `packages/cortex-native/src/components/atoms/Text/Text.tsx`
- Create: `packages/cortex-native/src/components/atoms/Text/styled.ts` → recipe file (see Step 2)
- Create: `packages/cortex-native/src/components/atoms/Text/functions.ts` (port of `getLabel`/capitalFirst from legacy
  `packages/react-core/src/components/atoms/Text/functions.ts`)
- Create: `packages/cortex-native/src/components/atoms/Text/Text.test.ts`
- Modify: `packages/cortex-native/src/index.ts`

**Interfaces:**

- Consumes: legacy `packages/react-core/src/components/atoms/Text/Text.tsx` + `styled.ts` (read-only).
- Produces: `Text` with props `fontColor`, `fontWeight`, `typography`, `fontStack`, `colorVariant`, `colorTone`,
  `numberOfLines`, `ellipsizeMode`, `textTransform`, `capitalFirst`, `style`, `children`, `testID` — identical to
  legacy.

**Style mapping (from `packages/react-core/src/components/atoms/Text/styled.ts` + legacy `styles/definitions.ts`):**

⚠️ Intentional API changes vs legacy (record them in the Task 15 migration notes — they surface again in the Task 14
parity audit):

- Legacy `fontColor` is only `light | medium | dark | orange`. It is renamed onto the cortex content tokens: `dark` →
  `high` (`text-content-high`, same `#353231`), `medium` → `low` (`text-content-low`, same `#85807a`); `light` (
  `text-light`) and `orange` (`text-orange`) keep their names. New keys added: `medium` (`text-content-medium`),
  `minimal` (`text-content-minimal`), `inverse` (`text-content-inverse`).
- Legacy `fontWeight` is only `regular | bold | black`; the full 8-weight scale is added (intentional expansion).

| Legacy (theme lookup)                                     | Tailwind class                                                                                                                                                         |
|-----------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `theme.font.color[fontColor]`                             | renamed keys above → `text-content-high` / `text-content-medium` / `text-content-low` / `text-content-minimal` / `text-content-inverse` / `text-light` / `text-orange` |
| `theme.font.weight[fontWeight]` (thin…black)              | `font-thin`, `font-light`, `font-normal`, `font-medium`, `font-semibold`, `font-bold`, `font-extrabold`, `font-black`                                                  |
| `theme.typography[typography]` (h1..h5, base, sub, label) | `text-h1` … `text-label` + `leading-h1` … `leading-label` (tokens `--text-*` + `--text-*--line-height` exist in tokens.css)                                            |
| `theme.font.stack[fontStack]` (default/mono)              | `font-sans` / `font-mono` (tokens `--font-sans`/`--font-mono`; RN renders a single family — no fallback stack)                                                         |
| `colorVariant + colorTone`                                | `text-primary-xlight` … `text-error-xdark` (tokens `--color-*`)                                                                                                        |
| `textTransform`                                           | `uppercase`/`lowercase`/`capitalize` (RN supports via textTransform style)                                                                                             |

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

Run: `pnpm --filter @tecsinapse/cortex-native test` — first create the jest config (see Step 3) + add `"test": "jest"`
script to cortex-native package.json. Expected: FAIL (module missing).

**Test-stack decision (new):** cortex-native uses **jest + @testing-library/react-native** — vitest cannot render RN
components and RNTL requires jest. The root does NOT already have jest (it has vitest ^4.1.0) — this step introduces a
second test stack: add devDeps to cortex-native: `jest`, `@testing-library/react-native`, `react-test-renderer` (React
19-compatible version). vitest stays for cortex-react. Root `pnpm test` (`pnpm --filter '@tecsinapse/*' run test`) picks
up the new script automatically — no root script changes needed. Root `AGENTS.md` is updated in Task 14 to reflect the
two test stacks.

- [ ] **Step 2: Implement the recipe + component**

`Text/styled.ts` (native recipe — do NOT hand-copy classes that cortex-core may later own; until then this is the native
source):

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
    fontStack: { default: 'font-sans', mono: 'font-mono' },
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

(Verify the exact variant keys against `textStyles` needs at implementation time; tone is applied via the
`text-<variant>-<tone>` classes when `colorTone` is provided — since Tailwind classes must be static, compose with a
small lookup object for the 5 tones × 6 variants, or use the tone as a suffix via a record — implement with a
`Record<ColorGradationType, string>` map, never template literals.)

`Text.tsx`:

```tsx
import React from 'react';
import { Text as RNText, StyleProp, TextStyle } from 'react-native';
import { getLabel } from './functions';
import { textStyles, fontColorStyles } from './styled';

export interface TextProps {
  fontColor?: 'high' | 'medium' | 'low' | 'minimal' | 'inverse' | 'light' | 'orange';
  fontWeight?: 'thin' | 'light' | 'regular' | 'medium' | 'semibold' | 'bold' | 'extrabold' | 'black';
  typography?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'base' | 'sub' | 'label';
  fontStack?: 'default' | 'mono';
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

const Text: React.FC<TextProps> = ({
                                     children, style, fontColor, colorVariant, colorTone, capitalFirst,
                                     typography, fontWeight, fontStack, textTransform, ...rnProps
                                   }) => (
  <RNText
    className={textStyles({ typography, fontWeight, fontStack, colorVariant, colorTone, fontColor })}
    style={[textTransform ? { textTransform } : null, style]}
    {...rnProps}
  >
    {getLabel(children, capitalFirst)}
  </RNText>
);

export default Text;
```

Note: destructure the variant props — do NOT spread them onto RNText (they are not valid RN props). `fontColor`/
`colorTone` resolve via static `Record` lookup maps in `styled.ts` (never template literals — Tailwind scanning needs
static class strings). `className` on RNText works because Uniwind's Metro plugin enables it (type-checked via the
`uniwind` devDep types).

- [ ] **Step 3: Wire tests + index**

`packages/cortex-native/package.json` scripts: add `"test": "jest"`. Create `packages/cortex-native/jest.config.js` (
local rootDir — do not point at the monorepo root):

```js
module.exports = {
  preset: 'react-native',
  testMatch: ['<rootDir>/src/**/*.test.ts{,x}'],
};
```

DevDeps per Step 1's test-stack decision (`jest`, `@testing-library/react-native`, `react-test-renderer`) — jest is NOT
present at the root today; this installs it fresh. In `src/index.ts`:

```ts
export { default as Text, TextProps } from './components/atoms/Text/Text';
```

- [ ] **Step 4: Verify**

Run: `pnpm --filter @tecsinapse/cortex-native test` → PASS. `pnpm --filter @tecsinapse/cortex-native build:dts` → Done.
`pnpm lint:ts` → 0 errors. Add a temporary Text with all variants in rn-playground App.tsx and visually compare with the
legacy Text (or defer visual check to Task 6 if no device handy — then note it in the commit).

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

- Consumes: cortex-core `buttonStyles` (`import { buttonStyles } from '@tecsinapse/cortex-core'`) — the tv recipe
  already covers intent/variant/size/compound variants.
- Produces: `Button` with legacy-compatible props: `title`, `onPress`, `disabled`, `intent` ('primary'|'secondary'|'
  success'|'info'|'warning'|'error'), `variant` ('outline'|'text'|'filled'), `size` ('default'|'small'|'square'|'
  circle'), `loading` (renders ActivityIndicator), `style`, `testID`.

- [ ] **Step 1: Failing test**

Read legacy `packages/react-core/src/components/atoms/Button/Button.tsx` and `styled.ts`. Port the behavior contract:
pressing calls `onPress` unless disabled; `loading` shows `ActivityIndicator` and blocks presses; classes come from
`buttonStyles({ intent, variant, size })`. Write `Button.test.ts`:

```ts
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Button from './Button';

describe('Button', () => {
  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByRole } = render(<Button title = "ok"
    onPress = { onPress }
    />);
    fireEvent.press(getByRole('button'));
    expect(onPress).toHaveBeenCalled();
  });
  it('does not call onPress when disabled', () => {
    const onPress = jest.fn();
    const { getByRole } = render(<Button title = "ok"
    onPress = { onPress }
    disabled / >
  )
    ;
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

Match legacy `buttonStyles` import style (cortex-react imports recipes from `@tecsinapse/cortex-core`). Verify the
`buttonStyles` variant keys match legacy Button's props (intent/variant/size — confirmed present in cortex-core
`src/components/button/button.ts`); the legacy `loading` visual (colors, spinner) is copied from legacy Button.tsx
behavior.

⚠️ **Validate the shared recipe under Uniwind FIRST** (this gates the "reuse cortex-core recipes" pattern for all of
Tasks 8–12): `buttonStyles` contains web-only variants — `hover:*`, `cursor-pointer`, `transition`,
`enabled:active:scale-95`, `disabled:*`. Render the Button in rn-playground and confirm Uniwind ignores or correctly
handles each unsupported variant (no parser errors, no stuck hover states, `active:`/`disabled:` states work via
Pressable). If any class breaks or mis-renders, fork a native override recipe (e.g.
`cortex-native/src/styles/button.ts`) and record the deviation — do not silently ship broken classes.

- [ ] **Step 3: Verify + commit**

Same verification as Task 5 (jest PASS, build:dts Done, lint 0 errors). Export from `src/index.ts`. Render in
rn-playground and compare against legacy Button (colors: `bg-primary-medium` for primary vs legacy
`theme.color.primary.medium`).

```bash
git add packages/cortex-native/src
git commit -m "feat(cortex-native): port Button atom to Uniwind, reusing cortex-core buttonStyles"
```

---

### Task 7: Port `Icon` (exemplar 3 — react-native-vector-icons)

**Files:**

- Create: `packages/cortex-native/src/components/atoms/Icon/Icon.tsx`
- Create: `packages/cortex-native/src/components/atoms/Icon/utils.ts` (port of `getIconColor` from legacy
  `packages/react-core/src/components/atoms/Icon/...`)
- Create: `packages/cortex-native/src/components/atoms/Icon/Icon.test.ts`
- Modify: `packages/cortex-native/src/index.ts`

**Interfaces:**

- Consumes: legacy `react-core/src/components/atoms/Icon/Icon.tsx` + `functions.ts` (uses `react-native-vector-icons`
  family components + `getIconColor(colorVariant, colorTone, fontColor, theme)`).
- Produces: `Icon` with props `type` ('material-community' etc.), `name`, `size` (icon-size tokens), `fontColor`,
  `colorVariant`, `colorTone`, `style`.

⚠️ Do NOT port the color logic against cortex-core `tokens/definitions.ts`: its `colors`/`textColor` values are web
`var(--color-…, #fallback)` strings, which RN cannot evaluate in a `color` prop. Colors must be resolved at runtime from
the active Uniwind theme.

- [ ] **Step 1: Failing test for the pure lookup maps**

`utils.ts` holds two pure, testable records:

- `ICON_SIZE_PX: Record<IconSizeType, number>` — static px values matching legacy (
  `micro: 12, mili: 14, centi: 16, deca: 18, kilo: 24, mega: 32`; legacy's `RFValue` scaling is intentionally dropped —
  see Global Constraints).
- `iconColorVar(colorVariant, colorTone, fontColor): string` — returns the CSS variable NAME to resolve, e.g.
  `iconColorVar('primary', 'medium') === '--color-primary-medium'`, fallback
  `iconColorVar(undefined, undefined, 'high') === '--color-content-high'` (fontColor keys per the renamed set in Task
  5).

Test:

```ts
import { ICON_SIZE_PX, iconColorVar } from './utils';

describe('Icon utils', () => {
  it('maps variant+tone to the token variable name', () => {
    expect(iconColorVar('primary', 'medium')).toBe('--color-primary-medium');
  });
  it('falls back to the fontColor variable', () => {
    expect(iconColorVar(undefined, undefined, 'high')).toBe('--color-content-high');
  });
  it('maps size tokens to px numbers', () => {
    expect(ICON_SIZE_PX.centi).toBe(16);
  });
});
```

Expected: FAIL.

- [ ] **Step 2: Implement**

`Icon.tsx` renders the vector-icon family component with `size={ICON_SIZE_PX[size]}` and resolves the color at runtime
via Uniwind's `useCSSVariable(iconColorVar(...))` hook (theme-aware, updates on theme switch; verify the exact hook
signature against the installed uniwind version — `getCSSVariable` is the non-hook equivalent). `className` is not used
here — vector icons take `color`/`size` props. Verify against legacy Icon.tsx prop-for-prop, and confirm in the
playground that the icon color flips with the Task 4 theme toggle.

- [ ] **Step 3: Verify + commit**

jest PASS, build:dts Done, lint 0 errors. Render in playground vs legacy (same glyph, color, size).

```bash
git add packages/cortex-native/src
git commit -m "feat(cortex-native): port Icon atom to Uniwind"
```

---

### Task 8: Port remaining atoms

For each atom below, follow the **exact task shape from Tasks 5–7**: (1) failing test for any pure logic (extract from
legacy), (2) implement component with `className` + recipes (reuse cortex-core `tv()` recipe when one exists — check
`packages/cortex-core/src/components/<name>/` — otherwise native recipe in `src/components/<name>/styled.ts`), (3)
verify jest/build:dts/lint, (4) visual parity in rn-playground, (5) commit `feat(cortex-native): port <Name>`.

**Recipe-validation gate (applies to every reused cortex-core `tv()` recipe):** before adopting a cortex-core recipe,
render a sample instance in rn-playground with the full variant matrix. Recipes contain web-only variants
(`hover:*`, `cursor-pointer`, `transition`, `enabled:active:scale-*`, `disabled:*`) — Uniwind may ignore them cleanly
OR misbehave (stuck hover state, transition no-op, etc.). If anything mis-renders, do NOT silently ship — fork the
recipe into `cortex-native/src/styles/<name>.ts` (native override) and record the deviation in the commit message.
This gate is established in Task 6 (Button) and applies uniformly to every reuse below.

| #  | Component        | Legacy source (read-only)                           | Specifics                                                                                                                         |
|----|------------------|-----------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------|
| 8a | Tag              | `react-core/src/components/atoms/Tag/`              | check cortex-core `tag.ts` recipe; tone maps `bg-<variant>-<tone>`                                                                |
| 8b | Badge            | `react-core/src/components/atoms/Badge/`            | legacy web-kit Badge disabled twMerge — verify no merge needed on RN                                                              |
| 8c | Card             | `react-core/src/components/atoms/Card/`             | elevation/surface tokens: `bg-surface-raised`, `shadow-*`, `rounded-*`                                                            |
| 8d | Checkbox         | `react-core/src/components/atoms/Checkbox/`         | touchable + icon toggling; pressed/disabled states via Pressable classes                                                          |
| 8e | RadioButton      | `react-core/src/components/atoms/RadioButton/`      | same as Checkbox                                                                                                                  |
| 8f | Switch           | `react-core/src/components/atoms/Switch/`           | uses `useTheme` + animation (`Switch/animation.ts`) — port animation with RN `Animated`                                           |
| 8g | Divider          | `react-core/src/components/atoms/Divider/`          | `bg-content-minimal` + `h-px`-style tokens                                                                                        |
| 8h | PressableSurface | `react-core/src/components/atoms/PressableSurface/` | `useTheme` for pressed color; `enabled:active:*` classes                                                                          |
| 8i | ProgressBar      | `react-core/src/components/atoms/ProgressBar/`      | width via style prop (dynamic), track/fill colors via classes                                                                     |
| 8j | Avatar           | `react-core/src/components/atoms/Avatar/`           | image + initials fallback; `rounded-full`                                                                                         |
| 8k | Paper            | `react-core/src/components/atoms/Paper/`            | surface + shadow tokens                                                                                                           |
| 8l | GroupButton      | `react-core/src/components/atoms/GroupButton/`      | container + child buttons; `flex-row`, gap tokens                                                                                 |
| 8m | BoxContent       | `react-core/src/components/atoms/BoxContent/`       | simple wrapper: `p-*`, `bg-*` from props                                                                                          |
| 8n | Skeleton         | `react-native-kit/src/components/atoms/Skeleton/`   | react-native-linear-gradient wave animation — port `Wave.tsx` (Animated + gradient) with `react-native-linear-gradient` (catalog) |

**Step shape per atom:** read legacy `styled.ts` + component; write the mapping table (like Task 5's); implement;
verify; commit. Commit message: `feat(cortex-native): port <Name> atom`.

---

### Task 9: Port molecules — part 1 (wrappers, no date logic)

Same task shape; all from legacy `react-core`/`react-native-kit` (read-only).

| #  | Component          | Legacy source                                               | Specifics                                                                                                                                                                                   |
|----|--------------------|-------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 9a | HintInputContainer | `react-core/src/components/molecules/HintInputContainer/`   | wrapper: `flex-row`, error color tokens                                                                                                                                                     |
| 9b | LabeledSwitch      | `react-native-kit/src/components/molecules/LabeledSwitch/`  | Text + Switch composition                                                                                                                                                                   |
| 9c | IconTextButton     | `react-native-kit/src/components/molecules/IconTextButton/` | Icon + Button                                                                                                                                                                               |
| 9d | InputPassword      | `react-native-kit/src/components/molecules/InputPassword/`  | wraps Input + Icon toggle                                                                                                                                                                   |
| 9e | TextArea           | `react-native-kit/src/components/molecules/TextArea/`       | multiline Input variant                                                                                                                                                                     |
| 9f | InputMask          | `react-native-kit/src/components/atoms/InputMask/`          | legacy native-kit does NOT use react-imask (that's cortex-react/web-only, DOM-bound) — port using react-core's `masks`/`formatWithMask` (currency.js) like the legacy native InputMask does |
| 9g | Grid               | `react-native-kit/src/components/molecules/Grid/`           | `flex`/gap styles; Row/Col/Item props → classes                                                                                                                                             |
| 9h | Snackbar           | `react-core/src/components/molecules/Snackbar/`             | context + animated entry (Animated), status colors                                                                                                                                          |

Verify each: jest (logic only), build:dts, lint, playground parity, commit `feat(cortex-native): port <Name>`.

---

### Task 10: Port molecules — part 2 (Input + PhoneInput + Select)

| #   | Component  | Legacy source                                                                  | Specifics                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
|-----|------------|--------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 10a | Input      | `react-core/src/components/atoms/Input/` + `hooks/useNumberMask.ts`            | **mask logic (shared)**: port `useNumberMask` + `formatWithMask` (`currency.js`) into **`@tecsinapse/cortex-core`** (`packages/cortex-core/src/utils/`) — these are platform-agnostic and shared with `cortex-react` (which today has a parallel copy in `src/components/Input/Mask.tsx` + `src/hooks/useNumberMask.ts`; the migration kills that duplication). cortex-native imports from `@tecsinapse/cortex-core`; `cortex-react` migrates off its local copy in this task. Unit tests for currency formatting live in cortex-core. `Input` itself uses `TextInput` + `className` + token-record color resolution. |
| 10b | PhoneInput | `react-core/src/components/molecules/PhoneInput/` + `PhoneCountrySelector.tsx` | `react-international-phone` (catalog) + `react-native-country-flag` (proven RN flag renderer from legacy native-kit; do NOT use `country-flag-icons` — it renders DOM SVG, web-only); port `FlagIcon`                                                                                                                                                                                                                                                                                                                                                                                                                 |
| 10c | Select     | `react-native-kit/src/components/molecules/Select/`                            | Modal + option list; safe-area via `react-native-safe-area-context` (peer)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |

Verify each: unit tests for masks/currency/flag logic; build:dts; lint; playground parity; commit.

---

### Task 11: Port molecules — part 3 (Calendar/date-fns v4 migration)

**This task includes the date-fns v2 → v4 migration.** Legacy call sites (from explore research):
`react-core/src/components/molecules/Calendar/Calendar.tsx` (`add, format, getWeeksInMonth, set`),
`Calendar/components/MonthWeek.tsx` (`compareAsc, isSameDay`), `Weekdays.tsx` (`format`), `DatePicker`/
`DateTimePicker` (`format`), `DateTimeSelector` (`getDaysInMonth` etc.), `Selector.tsx`, and
`react-native-kit/src/utils/date.ts` (`getLocale` from `date-fns/locale`).

**date-fns v2 → v4 breaking changes to verify per call site (checklist):**

1. **ESM-only output (v4)**: v4 dropped CJS. Tree-shakeable subpath imports (`from 'date-fns/add'`,
   `from 'date-fns/locale'`) still work; barrel import (`from 'date-fns'`) works for named exports but pulls more
   than needed. Both rolldown and tsc handle ESM; Metro needs `unstable_enablePackageExports`-equivalent (default in
   SDK 57 / RN 0.86) — verify with a smoke test in Task 3 before relying on it here.
2. **`format` signature unchanged** but tokens tightened (`yyyy` vs `YYYY` for week-year; `D` vs `d`). Audit each
   format string for ambiguous tokens — `react-core` uses several formats that may need re-tokenization.
3. **`add` / `set` / `getWeeksInMonth` / `getDaysInMonth` / `compareAsc` / `isSameDay` / `getLocale`**: signatures
   unchanged in v4 for the operations used here. No code changes needed beyond the import path (`'date-fns'` →
   `'date-fns/add'` for tree-shaking, or keep the barrel).
4. **No default export from `date-fns`** in v4. If any legacy call uses `import dateFns from 'date-fns'`, switch to
   named imports.
5. **Locale objects**: `date-fns/locale` still exposes all locales; if any locale was constructed with options in
   legacy, v4's `Locale` shape is the same.

Write a smoke test in `packages/cortex-core/src/utils/__tests__/date-fns-v4.smoke.test.ts` that imports each named
function used and asserts a known value — guards against any silent runtime error before component ports start.

- [ ] **Step 1: Inventory + failing tests**

For each call site, port the logic into **`packages/cortex-core/src/utils/date.ts`** (shared with cortex-react's
existing calendar/datepicker — same consolidation rationale as Task 10a). Use v4 imports from `'date-fns'` /
`'date-fns/locale'`; the smoke test above confirms the surface before this step. Write unit tests for the calendar
math the components depend on (e.g. week-grid generation for a known month/year, same-day comparison). Run tests →
FAIL until the utils exist.

- [ ] **Step 2: Port components**

| #   | Component              | Legacy source                                                                                           | Specifics                                                |
|-----|------------------------|---------------------------------------------------------------------------------------------------------|----------------------------------------------------------|
| 11a | Calendar               | `react-core/src/components/molecules/Calendar/`                                                         | grid + `MonthWeek` + `Weekdays`; uses date utils         |
| 11b | DatePicker             | `react-core/src/components/molecules/DatePicker/`                                                       | `format` for display                                     |
| 11c | DateTimePicker         | `react-core` + `react-native-kit` versions                                                              | merge both into one native component                     |
| 11d | DateTimePickerSelector | `react-native-kit/src/components/molecules/DateTimePickerSelector/` + `react-core/.../DateTimeSelector` | `getDaysInMonth` etc.                                    |
| 11e | ScrollableSelector     | `react-native-kit/src/components/molecules/ScrollableSelector/` + `DateBlock.tsx`                       | `getLocale`                                              |
| 11f | SnappingSlider         | `react-native-kit/src/components/molecules/SnappingSlider/`                                             | uses `useTheme` from emotion — replace with token record |

- [ ] **Step 3: Verify + commit per component**

Each component: build:dts (catches v2→v4 API drift), jest for date utils, playground parity, commit
`feat(cortex-native): port <Name>`.

---

### Task 12: Port molecules — part 4 (Overlay components)

| #   | Component                                                      | Legacy source                                                                | Specifics                                                                                               |
|-----|----------------------------------------------------------------|------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------|
| 12a | Modal                                                          | `react-native-kit/src/components/molecules/Modal/` + `ui/BaseModalView.tsx`  | `useSafeAreaInsets()` from `react-native-safe-area-context` (peer); backdrop `bg-black/50`-style tokens |
| 12b | BottomNavigator                                                | `react-native-kit/src/components/atoms/BottomNavigator/`                     | safe-area bottom inset                                                                                  |
| 12c | Header                                                         | `react-native-kit/src/components/atoms/Header/`                              | getStatusBarHeight → port `IPhoneXHelper` into `cortex-native/src/utils/` (RN-only) with test           |
| 12d | Menubar etc. (any remaining RN-kit-only components not listed) | audit `react-native-kit/src/components/` for leftovers after the tasks above | port each with same shape                                                                               |

Verify + commit per component.

---

### Task 13: Port PieChart (react-charts)

**Files:**

- Create: `packages/cortex-native/src/components/PieChart/PieChart.tsx`, `Dot.tsx`, `Label.tsx`, `styled.ts`, `utils.ts`
- Modify: `packages/cortex-native/src/index.ts`

**Interfaces:**

- Consumes: legacy `packages/react-charts/src/components/PieChart*` (emotion → className) + `react-native-svg` (peer).

- [ ] **Step 1: Port**

Read `react-charts/src/styles/constants.ts` (`fontColor`, `spacing`, `fontStack` etc.) and map to cortex-core tokens (
fontStack: single font-family per RN; colors → runtime-resolved `--color-*` values via `useCSSVariable`, per the Task 7
pattern). Port PieChart math (`utils.ts`) with unit tests (slice angles for a known dataset) — this REPLACES the legacy
runtime dep on `react-native-svg-charts`, which is dropped (record it in the Task 14 export audit). Replace
`@emotion/native` styled with Uniwind's `withUniwind` HOC wrapping each `react-native-svg` primitive (the committed
mechanism for third-party components per the Uniwind 1.x docs confirmed in review) — `className` does NOT propagate
into `react-native-svg` primitives on its own; `withUniwind` is the supported path. Verify each primitive
(`G`, `Path`, `Circle`, `Text`, `G`) renders correctly with `className` in playground before moving on.

- [ ] **Step 2: Verify + commit**

jest (math), build:dts, lint, playground render with a sample dataset, commit `feat(cortex-native): port PieChart`.

---

### Task 14: Full-surface audit + repo-docs gate

**Files:**

- Modify: `packages/cortex-native/src/index.ts` (final export surface)
- Modify: root `AGENTS.md` + `packages/cortex-native/AGENTS.md` (two test stacks: vitest for cortex-react, jest for
  cortex-native)
- No `.github/workflows/check.yml` change needed (see Step 2)

- [ ] **Step 1: Surface parity**

Diff cortex-native exports vs legacy `react-core/src/index.ts` + `react-native-kit/src/index.ts` + `react-charts`
exports. Every legacy export must be either ported or explicitly dropped (list dropped ones in the commit message —
including intentional API renames from Task 5, the dropped `react-native-svg-charts` dep, and the dropped `RFValue`
scaling). No emotion imports remain: `grep -rn "@emotion" packages/cortex-native/src` → 0 matches.

- [ ] **Step 2: CI gate — already covered; verify, don't add**

No new CI step is required: CI installs (`pnpm i` → `prepare` → root `pnpm build`, which runs `build:*` for every
`@tecsinapse/*` package, including cortex-native's `build:es`/`build:dts`) and runs `pnpm test` (which fans out the
`test` script of every `@tecsinapse/*` package, including cortex-native's jest). Verify locally instead: from a
clean state, `pnpm build` and `pnpm test` at the root both pick up cortex-native and pass. Then update the AGENTS.md
files (root: "vitest only runs in cortex-react" is no longer true; cortex-native: document the jest + RNTL setup).

- [ ] **Step 3: Verify + commit**

Full `pnpm test` (cortex-react + cortex-native) green; `pnpm lint:fix` green. Commit
`docs(cortex-native): finalize export surface and test-stack docs`.

---

### Task 15: Discontinue legacy packages + remove react-web-kit + react-charts

**Scope expansion (vs original plan):** `react-charts` is discontinued alongside `react-web-kit` (not just
deprecated). PieChart has been ported into cortex-native in Task 13, so the package has no remaining consumers —
`react-charts` is removed entirely. `react-core` and `react-native-kit` keep the deprecation-only path (consumers
migrate on their schedule).

- [ ] **Step 1: Deprecation notices (react-core + react-native-kit only)**

Add `"deprecated": "Moved to @tecsinapse/cortex-native"` to `react-core` and `react-native-kit` package.json (npm
deprecation metadata field). Do NOT change versions (lerna flow handles release). `react-charts` is NOT deprecated
because it is removed in Step 3 — deprecating a package about to be deleted is noise.

- [ ] **Step 2: Remove react-web-kit**

Delete `packages/react-web-kit/`; remove ALL references (each confirmed to exist today): `tailwind.config.mjs` (content
glob), `.storybook/main.ts` (stories glob), `.storybook/preview.tsx` (display name list),
`packages/rn-playground/metro.config.js` (`extraNodeModules` alias), `docs/setup/react-web-kit.mdx`,
`docs/introduction/installation.mdx` + `welcome.mdx` mentions. Root `package.json` has no reference (verified). Verify
`pnpm --filter '@tecsinapse/*' run build:dts` still passes for remaining packages and `pnpm build:storybook` still works
without the removed stories.

- [ ] **Step 3: Remove react-charts**

Delete `packages/react-charts/`. Remove ALL references — verified consumers today:
`packages/rn-playground/package.json` (`@tecsinapse/react-charts: workspace:*`),
`packages/rn-playground/metro.config.js`
(`extraNodeModules` alias for `@tecsinapse/react-charts`), `packages/rn-playground/App.tsx` (imports `PieChart` from
`@tecsinapse/react-charts`), root `pnpm-workspace.yaml` (catalog/storybook entries pointing at react-charts stories
if any), and `lerna.json` if it references the package explicitly. Replace `react-charts` imports in rn-playground
with `@tecsinapse/cortex-native` (`PieChart` is exported per Task 13). Run
`pnpm --filter '@tecsinapse/*' run build:dts` to confirm remaining packages still build.

- [ ] **Step 4: rn-playground emotion cleanup**

With both `react-web-kit` and `react-charts` gone and `react-native-kit` deprecated, rn-playground's only emotion
users are legacy RN stories. Remove `@emotion/native` + `@emotion/react` from `packages/rn-playground/package.json`
deps, remove any storybook/main entries that reference emotion, and confirm `pnpm --filter @tecsinapse/rn-playground
run:dev` starts Metro cleanly (the package is private + excluded from CI, so a manual smoke test is the gate).

- [ ] **Step 5: Docs**

Update `docs/setup/` + `AGENTS.md` (root + packages) to describe the new stack: cortex-native + Uniwind setup
requirements for consumers — Metro plugin (`withUniwindConfig` with `cssEntryFile`), global.css importing
`'tailwindcss'`, `'uniwind'`, `@tecsinapse/cortex-core/tokens.css` AND `tokens-native.css`, and the required `@source`
directive(s) so Tailwind scans the library's classes (e.g. `@source '../node_modules/@tecsinapse/cortex-native';`).
Include the migration notes: intentional API renames (Task 5 fontColor/fontWeight), dropped `RFValue` responsive
scaling, dropped `react-native-svg-charts`, dropped `react-charts` package (PieChart moved to cortex-native),
date-fns v2→v4.

- [ ] **Step 6: Final verification + commit**

Full suite: `pnpm test`, `pnpm lint:fix`, `pnpm build:storybook` (STORYBOOK_FONT_URL handled by scripts). Commit
`refactor(cortex-native): discontinue legacy emotion packages (react-web-kit + react-charts removed)` (split into
multiple commits per package if preferred — Step 2, Step 3, Step 4 can each be a separate commit for easier review).

---

**Explicitly deferred (recorded for follow-up, not in this plan):**

- Legacy package source deletion: `react-core` and `react-native-kit` remain on npm after deprecation for the
  consumer-migration window; removal is scheduled outside this plan once consumers migrate.
- Legacy dependency hygiene (spec §"Dependencies"): `react-native-kit` declares `date-fns` undeclared and ships an
  unused `react-international-phone` dep — out of scope since the package is frozen; revisit only if/when removal
  is scheduled.

---

## Post-plan notes

- Tasks 5–7 establish the pattern; Tasks 8–13 are repetitions with component-specific mappings (each task's "Specifics"
  column lists the legacy files and the tokens to use — read the named legacy styled.ts first, write the mapping table
  into the PR description).
- rn-playground remains the visual verification harness for every ported component.
- Uniwind APIs referenced in this plan were confirmed against the 1.x docs during review (2026-08-14):
  `withUniwindConfig(config, { cssEntryFile, dtsFile })` (outermost wrapper), global.css
  `@import 'tailwindcss'; @import 'uniwind';`, `@source` for monorepo scanning, `@variant dark` theme values,
  `Uniwind.setTheme`/`useUniwind`, `useCSSVariable`/`getCSSVariable`, `withUniwind` for third-party components.
  Re-verify signatures against the installed version in Task 3; the rest of the plan is engine-agnostic (className +
  tailwind-variants).
