# cortex-native: Uniwind-based React Native package — Design

Date: 2026-08-07
Status: Draft (awaiting review)

## Context

The legacy RN stack (`@tecsinapse/react-core` + `@tecsinapse/react-native-kit` + `@tecsinapse/react-charts`, all emotion
CSS-in-JS) duplicates design tokens that now live in the Tailwind 4 CSS-first `@theme` block of `@tecsinapse/cortex-core`.
This project consolidates the RN stack into a single new package, `@tecsinapse/cortex-native`, styled with **Uniwind**
(Tailwind v4 for React Native), inheriting tokens and component recipes from `cortex-core`.

### Decisions (approved)

- **Engine: Uniwind** — only stable Tailwind-v4 RN engine today (NativeWind v5 is still preview; v4 stable is TW v3).
  Uniwind 1.10 supports RN 0.86 / Expo SDK 57 (this repo's exact stack), is Metro-plugin-only (no Babel preset), and its
  className API is byte-compatible with NativeWind (choice is reversible).
- **Strategy: incremental** — new package built alongside legacy; port components one by one; deprecate legacy once parity
  reached.
- **react-web-kit: removed** (web consumers use `cortex-react`).
- **react-charts: migrated into `cortex-native`** (PieChart only).
- **Targets: iOS/Android only** (no react-native-web support).
- No implementation starts until this plan is approved.

## Architecture

```
@tecsinapse/cortex-core   (web)   tokens.css (@theme)  +  tv() component recipes + utils
      ▲ inherits tokens/recipes
@tecsinapse/cortex-native (RN)    Uniwind + tailwind-variants; exports RN components
      ▲ consumed by
@tecsinapse/rn-playground (Expo SDK 57 demo app; Uniwind Metro config + global.css)
```

### Package layout

- New package `packages/cortex-native` — same build shape as `cortex-react`/`cortex-core` (rollup `preserveModules`,
  `tsc` dts, publishable via lerna).
- `react-web-kit` removed after migration completes.
- `react-core`, `react-native-kit`, `react-charts` frozen (legacy tag) after deprecation; consumers migrate on their
  schedule.

### Token inheritance (the core of the idea)

1. **Extract tokens CSS**: split `cortex-core/src/default.css` into a platform-agnostic `tokens.css` (the `@theme`
   block: `--color-*`, `--spacing-*`, `--radius-*`, `--font-*`, `--text-*`, `--shadow-*`, `--z-index-*`, keyframes that
   are RN-safe) and keep web-only concerns (`@import "tailwindcss"`, `data-theme`/`data-contrast` selectors,
   `@layer utilities`) in `default.css` which imports `tokens.css`. Both shipped from `cortex-core`.
2. **cortex-native global stylesheet**: consumer app (rn-playground) imports
   `@import "uniwind"; @import "@tecsinapse/cortex-core/tokens.css";` — Uniwind's Metro plugin compiles the same
   `@theme` tokens into native styles. Token parity between web and RN is structural, not manual.
3. **Component recipes**: cortex-native reuses `cortex-core`'s `tv()` definitions
   (`src/components/<kebab-name>/<name>.ts`) as className output — same variants/props as cortex-react.
4. **Dark mode**: web uses `data-theme` + `DarkThemeProvider` (DOM). RN: Uniwind CSS-first theming — use
   `useColorScheme()` to set the theme variant; no React context wrapper. RN-specific `ThemeProvider` equivalent
   designed during implementation; must NOT import cortex-core's DOM-only `DarkThemeProvider`.
5. **cortex-core gets RN-safe**: any cortex-core token/recipe code that cortex-native depends on must stay
   DOM-free (no `document`/`window`). Dark-theme runtime utilities stay web-only.

### Component mapping (from explore research)

| Source | Size | Destination |
|---|---|---|
| react-core atoms (17 dirs, ~64 styled defs) | Avatar, Badge, BoxContent, Button, Card, Checkbox, Divider, GroupButton, Icon, Input, Paper, PressableSurface, ProgressBar, RadioButton, Switch, Tag, Text, shared/ | `cortex-native/src/components/atoms/*` |
| react-core molecules (13 dirs) | Calendar, DatePicker, DateTimePicker, DateTimeSelector, Grid, HintInputContainer, IconTextButton, InputPassword, LabeledSwitch, PhoneInput, Snackbar, TextArea | `cortex-native/src/components/molecules/*` |
| react-core theme/types | `lightTheme`, `ThemeProp`, `StyleProps`, definitions (spacing, borderRadius, typography, fontColor, zIndex, breakpoints, hex2rgba, statusColor, iconSize, borderWidth, fontStack, fontWeight) | → `cortex-core` tokens where they exist; RN-only leftovers in `cortex-native/src/tokens/` |
| react-core utils | `formatWithMask`, `masks`, `ResponsiveFontSize`, `variantComplement`, `lightenDarkenColor`, `IPhoneXHelper`, `extractNumbersFromString`, `useDebouncedState` | platform-agnostic → `cortex-core`; RN-only (`IPhoneXHelper`) → `cortex-native` |
| react-native-kit (14 atoms, 13 molecules, ~33 styled defs) | wraps/composes react-core | `cortex-native` (merged with react-core exports) |
| react-charts (PieChart + Dot/Label, react-native-svg) | ~19 files | `cortex-native/src/components/PieChart/*` |

Mapping rules:
- Platform-agnostic logic (masks, currency, date, contrast helpers) → `cortex-core` (shared with cortex-react).
- RN-only logic (safe-area, status bar, native fonts, gradient) → `cortex-native`.
- `react-native-kit` re-exports `react-core` wholesale; in cortex-native this is the natural default export surface.

### Dependencies (cortex-native)

- deps: `cortex-core` (workspace), `uniwind` (peer? verify), `tailwind-variants` (catalog), `clsx` (catalog),
  `currency.js` (catalog), `react-international-phone` (catalog), `date-fns` (**v4**, migrating from v2 API),
  `react-native-svg` (PieChart), `react-native-linear-gradient` (catalog), `react-native-safe-area-context`,
  `react-native-vector-icons` (catalog), `country-flag-icons`.
- devDeps: `react-native`, `react`, rollup toolchain.
- peers: `react >=19`, `react-native >=0.81`, `uniwind` (consumer-owned, like `tailwindcss` peer on cortex-core),
  `react-native-vector-icons`, `react-native-safe-area-context`.
- **date-fns v2 → v4**: react-core uses v2 API (`add`, `format`, `getWeeksInMonth`, `set`). Port must update to v4
  API names — check each of the 7 call sites + react-native-kit's `getLocale`.
- Fix dependency hygiene: react-native-kit uses `date-fns` undeclared; drops `react-international-phone` unused.

### Porting order (phases)

1. **Foundation**: tokens.css extraction + cortex-core RN-safety pass; `packages/cortex-native` scaffold (package.json,
   rollup, tsconfig, uniwind css entry, exports); rn-playground Uniwind setup (metro.config, global.css, app import).
2. **Atoms** (bottom-up): Text, Icon, Button, Input, Tag, Badge, Card, Checkbox, RadioButton, Switch, Divider,
   PressableSurface, ProgressBar, Avatar, Paper, GroupButton, Skeleton (gradient), BoxContent.
3. **Molecules**: HintInputContainer, LabeledSwitch, IconTextButton, InputPassword, TextArea, Grid, Snackbar, PhoneInput,
   Select, Calendar, DatePicker, DateTimePicker(+Selector), ScrollableSelector, BottomNavigator, Header, Modal,
   SnappingSlider.
4. **PieChart** (react-native-svg).
5. **Deprecation**: mark legacy packages deprecated in npm, remove react-web-kit, delete legacy source after
   consumer migration window.

Each ported component = one PR: same visual/behavior as legacy (compare in rn-playground), `tv()` recipe inherited from
cortex-core where one exists (otherwise native-only recipe), no emotion imports.

### Verification

- `pnpm --filter @tecsinapse/cortex-native build:dts` + `build:es` (new CI gate added to `check.yml`).
- `pnpm lint:ts` clean.
- rn-playground storybook + dev build renders each ported component; parity check vs legacy screenshots.
- New jest setup in cortex-native for pure-logic utils (masks, currency, date).
- `pnpm test` (existing cortex-react suite stays green — emotion stays installed during transition).

### Risks

- Uniwind ecosystem is young (mitigated: NativeWind-compatible className API; engine isolated behind our component API).
- date-fns v2→v4 API drift in calendar/date logic (mitigated: port + test calendar math).
- Dark mode on RN (no DOM `data-theme`): design theme variant mechanism in phase 1 and validate early with a
  story in rn-playground.
- Legacy consumers: deprecation + migration window; keep legacy packages publishable until parity is confirmed.

## Out of scope (this initiative)

- react-native-web support.
- Migrating cortex-react off anything (unchanged).
- New components beyond the ported surface.
