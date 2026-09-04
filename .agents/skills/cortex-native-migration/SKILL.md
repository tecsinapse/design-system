---
name: cortex-native-migration
description: Use when migrating a React Native consumer app from the deprecated legacy emotion stack (@tecsinapse/react-native-kit, @tecsinapse/react-core, @tecsinapse/react-charts) to @tecsinapse/cortex-native, or when removing @emotion/* imports / emotion deps from an RN app.
---

# cortex-native Migration

**Core principle:** `@tecsinapse/cortex-native` is the drop-in replacement for the deprecated legacy RN stack
(`react-native-kit` + `react-core` + `react-charts`). Migrate setup once, then swap imports and apply the intentional
API divergences, then verify.

`react-native-kit` re-exports `react-core` wholesale; `react-charts` is only `PieChart`. The component/prop mapping is
in [references/component-mapping.md](references/component-mapping.md). Working examples live in
`packages/rn-playground/` and the full guide in `docs/setup/cortex-native.mdx`.

## Workflow

Follow in order. Do not skip verification.

1. **Install + setup (once)**
   - Add deps (peers are explicit — `autoInstallPeers: false`; `react-native-svg` only needed for `PieChart`):
     ```bash
     pnpm add @tecsinapse/cortex-native uniwind react-native-vector-icons react-native-safe-area-context
     pnpm add react-native-svg   # only if using PieChart
     ```
   - Wrap Metro config with Uniwind (outermost):
     ```js
     const { withUniwindConfig } = require('uniwind/metro');
     module.exports = withUniwindConfig(config, {
       cssEntryFile: './global.css',
       dtsFile: './uniwind-types.d.ts',
     });
     ```
   - Create `global.css` importing tailwindcss + uniwind + BOTH cortex token files + `@source` for the library dirs
     (Tailwind scans from the css file's directory — without `@source` the library classes are NOT generated):
     ```css
     @import 'tailwindcss';
     @import 'uniwind';
     @import '@tecsinapse/cortex-core/tokens.css';
     @import '@tecsinapse/cortex-core/tokens-native.css';
     @source '../node_modules/@tecsinapse/cortex-native';
     @source '../node_modules/@tecsinapse/cortex-core';
     ```
     Import `./global.css` in the app entry file (NOT the registration entry).
   - Wrap the app root in the native `ThemeProvider` from `@tecsinapse/cortex-native` (`theme="light"|"dark"|"system"`).
   - **Mount `<ModalGroupManager />` once at the root** (sibling of `ThemeProvider`). It renders every
     `ModalView`/`useModalManager` modal through a single native overlay — without it `show()` is a no-op and the
     modal never opens. `Select`'s option list uses its own built-in modal and does not need it.

2. **Audit imports** — grep the app for `@tecsinapse/react-native-kit`, `@tecsinapse/react-core`,
   `@tecsinapse/react-charts`. Rewrite each import using the mapping table.

3. **Apply the intentional divergences** — see the checklist below. These are the "without pain" traps.

4. **Remove legacy deps** — uninstall `react-native-kit`, `react-core`, `react-charts`, and `@emotion/*`; delete any
   `styled`/`useTheme` usage from emotion.

5. **Verify** — typecheck, build, run on a device, and toggle light/dark theme to confirm semantic tokens swap.

## Intentional divergences (checklist)

- **`Button` children→`title`**: legacy `<Button><Text>…</Text></Button>` → `<Button title="…" />`. Title is a single
  string (no custom child nodes); loading renders a spinner. `variant` is `outline` (no trailing `d`), not `outlined`.
- **`fontColor` renames** (`Text`, `Icon`): legacy `dark`→`high`, `medium`→`low`; `light`/`orange` unchanged; new
  keys `medium`, `minimal`, `inverse` added.
- **`fontWeight` expansion**: legacy `regular|bold|black` → full 8-weight `thin…black`.
- **`Native*Props` folded into base names**: `TextNativeProps`→`TextProps`, `ButtonNativeProps`→`ButtonProps`,
  `BadgeNativeProps`→`BadgeProps`, `NativeDatePickerProps`→`DatePickerProps`,
  `NativeDateTimePickerProps`→`DateTimePickerProps`, `NativeIconTextButtonProps`→`IconTextButtonProps`,
  `SnackbarNativeProps`→`SnackbarProps`, `NativePhoneInputProps`→`PhoneInputProps`,
  `NativeFlagIconProps`→`FlagIconProps`.
- **`DatePicker`/`DateTimePicker` are self-contained** — DROP the legacy controlled props (`renderCalendar`,
  `request*`, `DateTimeSelectorComponent` injection). Use `value`/`onChange`/`format`/`placeholder`/`variant`/
  `hint`/`label`/`type` (`'day'` or `'range'`). `DateTimePicker` also dropped `dayLabel`, the `style` prop (wrap in a
  `<View>` for spacing), and `offsetThreshold`.
- **`PieChart`**: import from `@tecsinapse/cortex-native`, not `@tecsinapse/react-charts`. `PieChartData` now requires
  `label`; `color` is a **token name** (`'orange'`, `'info-medium'`) resolved at runtime — NOT a hex `'#f89907'`.
  `react-native-svg-charts` dep is gone (math is local).
- **`RFValue`/`RFPercentage` responsive scaling is dropped** — sizes use fixed cortex tokens
  (`micro:12 mili:14 centi:16 deca:18 kilo:24 mega:32`).
- **date-fns v2→v4**: v4 is ESM-only, no default export; format tokens tightened (`yyyy` vs `YYYY`, `d` vs `D`) —
  audit format strings.
- **Input/TextArea onChange signatures**: `InputMask.onChange` widened to `(value: string | number)` (cast a
  `useState<string>` setter); `TextArea.onChange` became `(e: TextInputChangeEvent)` — read `e.nativeEvent.text`.
- **No emotion**: cortex-native has zero `@emotion/*`. Remove any emotion `styled`/`useTheme`.

## Common mistakes / red flags

- **Raw strings in a View** → RN runtime error "Text strings must be rendered within a `<Text>` component".
  `Button.title`, `Tag.value`, `Badge.value`, and `Snackbar.children` are all rendered inside a View/Pressable —
  wrap string/number values in `<Text>` (Tag/Badge now auto-wrap strings; Button requires a string `title`). Jest's test
  renderer silently allows this, so it only shows up on a device.
- **Copying `var(--color…)` strings from `tokens/definitions.ts` into a `color` prop** — RN can't evaluate them. For
  prop-valued colors (icon `color`, `ActivityIndicator`), resolve via Uniwind `useCSSVariable('--color-…')`; never
  copy the web `var()` string and never hardcode hex for token colors.
- **Expecting web-only classes to be stateful on RN**: `hover:`, `active:`, `disabled:`, `transition` do NOT behave as
  state on native. Use Pressable state/opacity instead.
- **Missing `@source` in global.css** → components render unstyled silently.
- **Forgetting to mount `<ModalGroupManager />`** → `useModalManager`/`useModalRemoteControl` modals silently never
  open (`show()` is a no-op). Mount it once at the root next to `ThemeProvider`.
- **Forgetting both token css files** (`tokens.css` AND `tokens-native.css`) → dark theme tokens missing.
- **Leaving legacy deps/emotion installed** after migration.

## RN-app infrastructure (not cortex-native, but blocks verification)

- **React Compiler (`experiments.reactCompiler: true` in app.json)** breaks components that read mutable
  module singletons during render — the compiler memoizes the read, so the value stays stale (e.g. modals never
  opening; jest passes because the app babel config isn't applied there). The Modal system is compiler-safe: it
  exposes its state via `useSyncExternalStore` (`modalLifecycle.subscribe`/`getSnapshot`). When adding new
  singleton-based components, follow that store pattern — never call external mutable getters during render.
- **Storybook v10 backgrounds addon** expects `parameters.backgrounds.values` (array of `{ name, value }`) + `default`,
  not the v9 keyed `options` object — the decorator crashes on `backgrounds.length` if `values` is undefined.
- **`@gorhom/bottom-sheet` v4 breaks on Reanimated 4** (`useWorkletCallback` was removed). On SDK 57 / Reanimated 4 apps
  using storybook, bump to v5 (`>=4` peer still satisfied).
