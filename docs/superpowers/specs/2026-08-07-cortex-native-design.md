# cortex-native: Uniwind-based React Native package — Design

Date: 2026-08-07
Status: Reviewed 2026-08-14 — review amendments applied (verified against codebase + Uniwind 1.x docs)

## Context

The legacy RN stack (`@tecsinapse/react-core` + `@tecsinapse/react-native-kit` + `@tecsinapse/react-charts`, all emotion
CSS-in-JS) duplicates design tokens that now live in the Tailwind 4 CSS-first `@theme` block of
`@tecsinapse/cortex-core`.
This project consolidates the RN stack into a single new package, `@tecsinapse/cortex-native`, styled with **Uniwind**
(Tailwind v4 for React Native), inheriting tokens and component recipes from `cortex-core`.

### Decisions (approved)

- **Engine: Uniwind** — only stable Tailwind-v4 RN engine today (NativeWind v5 is still preview; v4 stable is TW v3).
  Uniwind 1.10 supports RN 0.86 / Expo SDK 57 (this repo's exact stack), is Metro-plugin-only (no Babel preset), and its
  className API is byte-compatible with NativeWind (choice is reversible).
- **Strategy: incremental** — new package built alongside legacy; port components one by one; deprecate legacy once
  parity
  reached.
- **react-web-kit: removed** (web consumers use `cortex-react`).
- **react-charts: migrated into `cortex-native`** (PieChart only).
- **Targets: iOS/Android only** (no react-native-web support).
- **Build: rolldown + tsc** (same as cortex-core/cortex-react — not legacy rollup).
- **Tests: jest + @testing-library/react-native** in cortex-native — a second test stack (vitest stays for
  cortex-react); RNTL requires jest and vitest cannot render RN components.
- **uniwind: peer + devDependency** of cortex-native (consumer-owned runtime, like the `tailwindcss` peer on
  cortex-core; devDep provides types/API for the package's own build).
- **Flags: `react-native-country-flag`** (proven RN renderer, already used by react-native-kit) — NOT
  `country-flag-icons` (renders DOM SVG, web-only).
- **Dark-mode values ship in `tokens-native.css`** (Uniwind `@variant dark` block), imported only by native global.css;
  web stays on `:root[data-theme='dark']`.
- **Legacy `RFValue` responsive scaling is dropped** — fixed Tailwind sizing; accepted visual change, documented in
  migration notes.
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

- New package `packages/cortex-native` — same build shape as `cortex-react`/`cortex-core` (rolldown
  `preserveModules` → `dist/esm`, `tsc` dts, publishable via lerna). `"react-native": "src/index.ts"` entry so Metro
  bundles the raw TS source (same pattern as react-core).
- `react-web-kit` removed after migration completes.
- `react-core`, `react-native-kit`, `react-charts` frozen (legacy tag) after deprecation; consumers migrate on their
  schedule.

### Token inheritance (the core of the idea)

1. **Extract tokens CSS**: split `cortex-core/src/default.css` into a platform-agnostic `tokens.css` (plain `:root`
   vars + the `@theme` block: `--color-*`, `--spacing-*`, `--radius-*`, `--font-*`, `--text-*`, `--shadow-*`,
   `--z-index-*`; animation/keyframes entries stay web-only) plus a native-only `tokens-native.css` carrying the
   dark-theme overrides in Uniwind syntax (`@layer theme { :root { @variant dark { ... } } }`). Web-only concerns
   (`@import "tailwindcss"`, `data-theme`/`data-contrast` selectors, `@layer utilities`) stay in `default.css`, which
   imports `tokens.css` (never `tokens-native.css`). All three shipped from `cortex-core`.
2. **cortex-native global stylesheet**: consumer app (rn-playground) imports
   `@import "tailwindcss"; @import "uniwind"; @import "@tecsinapse/cortex-core/tokens.css"; @import "@tecsinapse/cortex-core/tokens-native.css";`
   plus `@source` directives for the library sources (Tailwind scans from the global.css directory — without
   `@source`, classes inside the component packages are not generated). Uniwind's Metro plugin compiles the same
   `@theme` tokens into native styles. Token parity between web and RN is structural, not manual.
3. **Component recipes**: cortex-native reuses `cortex-core`'s `tv()` definitions
   (`src/components/<kebab-name>/<name>.ts`) as className output — same variants/props as cortex-react — after
   validating each recipe under Uniwind (recipes contain web-only variants like `hover:*`/`cursor-pointer`; native
   overrides live in `cortex-native/src/styles/` when a recipe doesn't translate).
4. **Dark mode**: web uses `data-theme` + `DarkThemeProvider` (DOM). RN uses Uniwind's theme registry
   (`Uniwind.setTheme('light'|'dark'|'system')`, `useUniwind()`), with the dark VALUES delivered by
   `tokens-native.css` (`@variant dark`). cortex-native ships a thin `ThemeProvider` wrapper (prop-driven,
   system-following by default) — it only switches the active theme and must NOT import cortex-core's DOM-only
   `DarkThemeProvider`.
5. **cortex-core gets RN-safe**: any cortex-core token/recipe code that cortex-native depends on must stay
   DOM-free (no `document`/`window`). Dark-theme runtime utilities stay web-only. Prop-valued colors/sizes that
   can't be classes (vector-icon `color`/`size`, chart values) resolve CSS variables at runtime via Uniwind
   `useCSSVariable`/`getCSSVariable` — cortex-core `tokens/definitions.ts` values are web `var()` strings and are
   NOT usable on RN.

### Component mapping (from explore research)

| Source                                                     | Size                                                                                                                                                                                          | Destination                                                                               |
|------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------|
| react-core atoms (17 dirs, ~64 styled defs)                | Avatar, Badge, BoxContent, Button, Card, Checkbox, Divider, GroupButton, Icon, Input, Paper, PressableSurface, ProgressBar, RadioButton, Switch, Tag, Text, shared/                           | `cortex-native/src/components/atoms/*`                                                    |
| react-core molecules (13 dirs)                             | Calendar, DatePicker, DateTimePicker, DateTimeSelector, Grid, HintInputContainer, IconTextButton, InputPassword, LabeledSwitch, PhoneInput, Snackbar, TextArea                                | `cortex-native/src/components/molecules/*`                                                |
| react-core theme/types                                     | `lightTheme`, `ThemeProp`, `StyleProps`, definitions (spacing, borderRadius, typography, fontColor, zIndex, breakpoints, hex2rgba, statusColor, iconSize, borderWidth, fontStack, fontWeight) | → `cortex-core` tokens where they exist; RN-only leftovers in `cortex-native/src/styles/` |
| react-core utils                                           | `formatWithMask`, `masks`, `ResponsiveFontSize`, `variantComplement`, `lightenDarkenColor`, `IPhoneXHelper`, `extractNumbersFromString`, `useDebouncedState`                                  | platform-agnostic → `cortex-core`; RN-only (`IPhoneXHelper`) → `cortex-native`            |
| react-native-kit (14 atoms, 13 molecules, ~33 styled defs) | wraps/composes react-core                                                                                                                                                                     | `cortex-native` (merged with react-core exports)                                          |
| react-charts (PieChart + Dot/Label, react-native-svg)      | ~19 files                                                                                                                                                                                     | `cortex-native/src/components/PieChart/*`                                                 |

Mapping rules:

- Platform-agnostic logic (masks, currency, date, contrast helpers) → `cortex-core` (shared with cortex-react).
- RN-only logic (safe-area, status bar, native fonts, gradient) → `cortex-native`.
- `react-native-kit` re-exports `react-core` wholesale; in cortex-native this is the natural default export surface.

### Dependencies (cortex-native)

- deps: `cortex-core` (workspace), `tailwind-variants` (catalog), `clsx` (catalog),
  `currency.js` (catalog), `react-international-phone` (catalog), `date-fns` (**v4** via catalog, migrating from v2
  API), `react-native-country-flag`, `react-native-linear-gradient` (catalog).
- devDeps: `react-native`, `react`, `uniwind`, rolldown toolchain, `jest` + `@testing-library/react-native` +
  `react-test-renderer`.
- peers: `react >=19`, `react-native >=0.81`, `uniwind` (consumer-owned, like `tailwindcss` peer on cortex-core),
  `react-native-vector-icons`, `react-native-safe-area-context`, `react-native-svg` (PieChart only, like
  react-charts).
- **date-fns v2 → v4**: react-core uses v2 API (`add`, `format`, `getWeeksInMonth`, `set`). Port must update to v4
  API names — check each of the 7 call sites + react-native-kit's `getLocale`.
- Fix dependency hygiene: react-native-kit uses `date-fns` undeclared; drops `react-international-phone` unused.
- Dropped vs legacy: `country-flag-icons` (web-only; replaced by `react-native-country-flag`),
  `react-native-svg-charts` (PieChart math ported into `utils.ts`), `RFValue` responsive scaling.

### Porting order (phases)

1. **Foundation**: tokens.css + tokens-native.css extraction + cortex-core RN-safety pass; `packages/cortex-native`
   scaffold (package.json, rolldown, tsconfig, exports); rn-playground Uniwind setup (metro.config, global.css with
   `@source` directives, app import).
2. **Atoms** (bottom-up): Text, Icon, Button, Input, Tag, Badge, Card, Checkbox, RadioButton, Switch, Divider,
   PressableSurface, ProgressBar, Avatar, Paper, GroupButton, Skeleton (gradient), BoxContent.
3. **Molecules**: HintInputContainer, LabeledSwitch, IconTextButton, InputPassword, TextArea, Grid, Snackbar,
   PhoneInput,
   Select, Calendar, DatePicker, DateTimePicker(+Selector), ScrollableSelector, BottomNavigator, Header, Modal,
   SnappingSlider.
4. **PieChart** (react-native-svg).
5. **Deprecation**: mark legacy packages deprecated in npm, remove react-web-kit, delete legacy source after
   consumer migration window.

Each ported component = one PR: same visual/behavior as legacy (compare in rn-playground), `tv()` recipe inherited from
cortex-core where one exists (otherwise native-only recipe), no emotion imports.

### Verification

- `pnpm --filter @tecsinapse/cortex-native build:dts` + `build:es`. No `check.yml` change needed: CI's `pnpm i`
  (prepare → root `pnpm build`) builds every `@tecsinapse/*` package, and root `pnpm test` runs every package's
  `test` script — cortex-native is gated automatically once its scripts exist.
- `pnpm lint:ts` clean.
- rn-playground storybook + dev build renders each ported component; parity check vs legacy (accounting for the
  intentional fixed-sizing change — legacy `RFValue` scaling is dropped).
- New jest setup in cortex-native (`jest` + `@testing-library/react-native`); pure-logic utils (masks, currency,
  date) get unit tests.
- `pnpm test` (existing cortex-react vitest suite stays green — emotion stays installed during transition).

### Risks

- Uniwind ecosystem is young (mitigated: NativeWind-compatible className API; engine isolated behind our component API).
- date-fns v2→v4 API drift in calendar/date logic (mitigated: port + test calendar math).
- ~~Dark mode on RN (no DOM `data-theme`)~~ → resolved in review: dark values ship in `tokens-native.css`
  (`@variant dark`), switching via Uniwind's theme registry; validated early in rn-playground (plan Task 4).
- Shared `tv()` recipes contain web-only variants (`hover:*`, `cursor-pointer`, `transition`): validated per recipe
  in plan Task 6; native overrides in `cortex-native/src/styles/` as fallback.
- Two test stacks (vitest + jest) to maintain — accepted cost of RNTL requiring jest.
- Fixed sizing vs legacy `RFValue` responsive scaling — accepted visual change; verify per-component parity in
  rn-playground and document in migration notes.
- Legacy consumers: deprecation + migration window; keep legacy packages publishable until parity is confirmed.

## Out of scope (this initiative)

- react-native-web support.
- Migrating cortex-react off anything (unchanged).
- New components beyond the ported surface.
