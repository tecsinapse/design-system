# Legacy → cortex-native component mapping

Source of truth for rewriting imports from the deprecated emotion stack to `@tecsinapse/cortex-native`.
`react-native-kit` re-exports everything from `react-core`, so both map to the same cortex-native export.

## Import rewrites

```diff
-import { Text, Button, Icon, Input, ... } from '@tecsinapse/react-native-kit';
-import { PieChart, PieChartData } from '@tecsinapse/react-charts';
+import { Text, Button, Icon, Input, ..., PieChart, type PieChartData } from '@tecsinapse/cortex-native';
```

`@tecsinapse/react-core`'s `useTheme` (emotion, returns a color object) is replaced by cortex-native's
`useTheme` (returns `{ theme, resolvedTheme, setTheme }` — light/dark/system). Do NOT assume it returns colors.

## Components (legacy → cortex-native)

| Legacy component                                                                                    | cortex-native export                         | Notes                                                                                                              |
| --------------------------------------------------------------------------------------------------- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `Text`                                                                                              | `Text`                                       | `fontColor` renames: `dark`→`high`, `medium`→`low`; +`medium`/`minimal`/`inverse`. `fontWeight` 8-weight.          |
| `Button` / `Error`/`Loading`/`Success`                                                              | `Button`                                     | `intent`/`variant`/`size` same.                                                                                    |
| `Icon`                                                                                              | `Icon`                                       | `fontColor` renames same as `Text`.                                                                                |
| `Input`                                                                                             | `Input`                                      | `Native*Props`→`InputProps`.                                                                                       |
| `InputMask`                                                                                         | `InputMask`                                  | `InputMaskNativeProps`→`InputMaskProps`.                                                                           |
| `TextArea`                                                                                          | `TextArea`                                   |                                                                                                                    |
| `InputPassword`                                                                                     | `InputPassword`                              | `InputPasswordNativeProps`→`InputPasswordProps`.                                                                   |
| `HintInputContainer`                                                                                | `HintInputContainer`                         |                                                                                                                    |
| `Tag`                                                                                               | `Tag`                                        |                                                                                                                    |
| `Badge`                                                                                             | `Badge`                                      | `BadgeNativeProps`→`BadgeProps`.                                                                                   |
| `Card`                                                                                              | `Card` (+ `CardHeader`, `CardFooter`)        |                                                                                                                    |
| `Checkbox`                                                                                          | `Checkbox`                                   |                                                                                                                    |
| `RadioButton`                                                                                       | `RadioButton`                                |                                                                                                                    |
| `Switch`                                                                                            | `Switch`                                     |                                                                                                                    |
| `Divider`                                                                                           | `Divider`                                    |                                                                                                                    |
| `PressableSurface`                                                                                  | `PressableSurface`                           |                                                                                                                    |
| `ProgressBar`                                                                                       | `ProgressBar`                                |                                                                                                                    |
| `Avatar`                                                                                            | `Avatar`                                     |                                                                                                                    |
| `Paper`                                                                                             | `Paper`                                      |                                                                                                                    |
| `GroupButton` / `GroupButtonOption`                                                                 | `GroupButton` / `GroupButtonOption`          |                                                                                                                    |
| `BoxContent`                                                                                        | `BoxContent`                                 |                                                                                                                    |
| `Skeleton`                                                                                          | `Skeleton`                                   | `react-native-linear-gradient` internal.                                                                           |
| `LabeledSwitch`                                                                                     | `LabeledSwitch`                              |                                                                                                                    |
| `IconTextButton`                                                                                    | `IconTextButton`                             | `NativeIconTextButtonProps`→`IconTextButtonProps`.                                                                 |
| `Grid` / `GridItem`                                                                                 | `Grid` / `GridItem`                          |                                                                                                                    |
| `Snackbar`                                                                                          | `Snackbar`                                   | `SnackbarNativeProps`→`SnackbarProps`.                                                                             |
| `PhoneInput` / `FlagIcon`                                                                           | `PhoneInput` / `FlagIcon`                    | `NativePhoneInputProps`→`PhoneInputProps`; `NativeFlagIconProps`→`FlagIconProps`.                                  |
| `PhoneCountryPickerSelector`                                                                        | `PhoneCountryPickerSelector`                 |                                                                                                                    |
| `Select`                                                                                            | `Select`                                     | `SelectNativeProps`→`SelectProps`.                                                                                 |
| `Calendar`                                                                                          | `Calendar`                                   |                                                                                                                    |
| `DatePicker`                                                                                        | `DatePicker`                                 | **Self-contained** — drop `renderCalendar`/`request*`. Use `value`/`onChange`/`format`/`type` (`'day'`/`'range'`). |
| `DateTimePicker`                                                                                    | `DateTimePicker`                             | **Self-contained** — drop `renderCalendar`/`request*`.                                                             |
| `DateTimePickerSelector` / `ControlledDateTimePickerSelector`                                       | `DateTimePickerSelector`                     | Merged into one.                                                                                                   |
| `ScrollableSelector` / `DateBlock`                                                                  | `ScrollableSelector` / `DateBlock`           |                                                                                                                    |
| `SnappingSlider`                                                                                    | `SnappingSlider`                             |                                                                                                                    |
| `ModalView`, `ModalGroupManager`, `useModalManager`, `useLazyModalManager`, `useModalRemoteControl` | same names                                   |                                                                                                                    |
| `BottomNavigator`                                                                                   | `BottomNavigator`                            |                                                                                                                    |
| `Header`                                                                                            | `Header`                                     | `HeaderProps`/`Attachable` same.                                                                                   |
| `PieChart` / `Dot` / `Label`                                                                        | `PieChart` / `PieChartDot` / `PieChartLabel` | `PieChartData` now requires `label`; `color` = token name (not hex).                                               |

## `useTheme` / helpers

| Legacy                                        | cortex-native              | Notes                                                                                                |
| --------------------------------------------- | -------------------------- | ---------------------------------------------------------------------------------------------------- |
| `useTheme` (react-core, returns color object) | `useTheme` (cortex-native) | Returns `{ theme, resolvedTheme, setTheme }`, not colors. Resolve token colors via `useCSSVariable`. |
| `useDebouncedState`                           | `useDebouncedState`        | Same.                                                                                                |
| `lightenDarkenColor`                          | `lightenDarkenColor`       | Same.                                                                                                |

## Not ported / removed

- `react-native-svg-charts` — PieChart math is local now.
- `country-flag-icons` — use `react-native-country-flag` (PhoneInput/FlagIcon handle this).
- `RFValue` / `RFPercentage` — fixed size tokens.
- `@emotion/*` — all removed.

If a legacy export is not in this table, check `packages/cortex-native/src/index.ts` for the current surface before
assuming it's missing.
