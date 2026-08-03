# Cortex Core Token Skill Reference

This document defines every design token exported by `@tecsinapse/cortex-core` and is intended for any developer agent that needs a complete token reference.

It covers the exported token groups from `packages/cortex-core/src/tokens/definitions.ts` and explains how agents should use them in component styling, theme updates, and CSS variable fallback patterns.

## Purpose

Use this reference when a developer agent needs to answer questions such as:

- What tokens does `@tecsinapse/cortex-core` expose?
- Which color shades are available for a specific semantic color?
- What spacing, radius, or font-size tokens should be used in a component?
- How can theme values be referenced through CSS variables?

## Token exports

`@tecsinapse/cortex-core` exports the following token groups from `packages/cortex-core/src/index.ts`:

- `colors`
- `spacing`
- `borderRadius`
- `borderWidth`
- `fontSize`
- `boxShadow`
- `borderColor`
- `fontFamily`
- `textColor`
- `zIndex`

## Token definitions

### colors

- `primary`
  - `xlight`: `var(--color-primary-xlight, #fef9f0)`
  - `light`: `var(--color-primary-light, #fccb83)`
  - `medium`: `var(--color-primary-medium, #f89907)`
  - `dark`: `var(--color-primary-dark, #ae6b05)`
  - `xdark`: `var(--color-primary-xdark, #633d03)`
- `secondary`
  - `xlight`: `var(--color-secondary-xlight, #f8f7f7)`
  - `light`: `var(--color-secondary-light, #c2bfbc)`
  - `medium`: `var(--color-secondary-medium, #85807a)`
  - `dark`: `var(--color-secondary-dark, #5d5955)`
  - `xdark`: `var(--color-secondary-xdark, #353231)`
- `info`
  - `xlight`: `#f0f8fe`
  - `light`: `#85c7fa`
  - `medium`: `#239bf6`
  - `dark`: `#0873c4`
  - `xdark`: `#043962`
- `success`
  - `xlight`: `#f3fcf8`
  - `light`: `#99e6c9`
  - `medium`: `#2db783`
  - `dark`: `#238f67`
  - `xdark`: `#14523b`
- `warning`
  - `xlight`: `#fffcf0`
  - `light`: `#ffe380`
  - `medium`: `#ffc700`
  - `dark`: `#cc9f00`
  - `xdark`: `#665000`
- `surface`
  - `base`: `var(--color-surface-base, #f8f7f7)`
  - `raised`: `var(--color-surface-raised, #fbfbfb)`
  - `overlay`: `var(--color-surface-overlay, #ffffff)`
- `content`
  - `high`: `var(--color-content-high, #353231)`
  - `medium`: `var(--color-content-medium, #5d5955)`
  - `low`: `var(--color-content-low, #85807a)`
  - `minimal`: `var(--color-content-minimal, #c2bf82)`
  - `inverse`: `var(--color-content-inverse, #ffffff)`
- `error`
  - `xlight`: `#fdf3f2`
  - `light`: `#ee9891`
  - `medium`: `#e04638`
  - `dark`: `#9b2318`
  - `xdark`: `#58240e`
- `miscellaneous`
  - `body`: `#f8f7f7`

### spacing

- `nano`: `0.125rem`
- `micro`: `0.25rem`
- `mili`: `0.5rem`
- `centi`: `0.75rem`
- `deca`: `1rem`
- `kilo`: `1.5rem`
- `mega`: `2rem`
- `giga`: `2.5rem`
- `tera`: `3rem`
- `peta`: `3.5rem`
- `hexa`: `4rem`

### borderRadius

- `nano`: `0.125rem`
- `micro`: `0.25rem`
- `mili`: `0.5rem`
- `centi`: `1rem`
- `deca`: `1.5rem`
- `pill`: `999999px`

### borderWidth

- `pico`: `0.063rem`
- `nano`: `0.125rem`

### fontSize

- `h5`: `['1rem', '1.5rem']`
- `h4`: `['1.125rem', '1.688rem']`
- `h3`: `['1.25rem', '2rem']`
- `h2`: `['1.625rem', '2.375rem']`
- `h1`: `['2rem', '2.625rem']`
- `base`: `['0.875rem', '1.313rem']`
- `sub`: `['0.75rem', '1.125rem']`
- `label`: `['0.625rem', '0.75rem']`
- `micro`: `0.75rem`
- `mili`: `0.875rem`
- `centi`: `1rem`
- `deca`: `1.125rem`
- `kilo`: `1.5rem`
- `mega`: `2rem`

### boxShadow

- `default`: `0 2px 8px rgba(0, 0, 0, 0.05)`

### borderColor

- `success-light`: `#99E6C9`

### fontFamily

- `sans`: `['Lato', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji']`
- `mono`: `Consolas, monaco, monospace`

### textColor

- `default`: `var(--color-default, #000)`
- `inverse`: `var(--color-inverse, #fff)`
- `light`: `var(--color-on-primary, #fff)`
- `medium`: `var(--color-medium, #85807a)`
- `dark`: `var(--color-dark, #353231)`
- `orange`: `#f89907`

### zIndex

- `default`: `0`
- `absolute`: `1`
- `select`: `20`
- `input`: `20`
- `popover`: `30`
- `tooltip`: `40`
- `header`: `600`
- `backdrop`: `700`
- `drawer`: `700`
- `sidebar`: `800`
- `modal`: `1000`

## Base component variants

The Cortex Core package exports the following base components from `packages/cortex-core/src/components/index.ts`.

### badge

- `intent`: `primary`, `secondary`, `error`, `success`, `warning`, `info`
- `isAnchor`: `true`, `false`
- `hidden`: `true`

### button

- `intent`: `primary`, `secondary`, `success`, `info`, `warning`, `error`
- `variant`: `outline`, `text`, `filled`
- `size`: `default`, `small`, `square`, `circle`, `base`

### card

- no configurable variants exposed by the base style

### checkbox

- no configurable variants exposed by the base style

### common

- `overlay.show`: `true`, `false`
- `pressableSurface.selected`: `true`, `false`

### divider

- no configurable variants exposed by the base style

### drawer

- `position`: `left`, `right`
- `open`: `true`, `false`

### hint

- `intent`: `default`, `success`, `warning`, `error`

### input

- `intent`: `default`, `success`, `warning`, `error`
- `label` variants share the same intents for label styling

### modal

- `open`: `true`, `false`

### popover

- base component style only; popover container and item styles are exported with no additional variant keys

### radio-button

- `reversed`: `true`, `false`

### select

- `intent`: `default`, `error`
- option variants: `selected` `true`/`false`, `grouped` `true`/`false`

### snackbar

- `intent`: `default`, `secondary`, `success`, `error`, `info`, `warning`

### table

- no configurable variants exposed by the base style

### tag

- `intent`: `primary`, `secondary`, `info`, `success`, `warning`, `error`, `white`

### toggle

- `intent`: `primary`, `secondary`, `info`, `success`, `warning`, `error`

### tooltip

- `position`: `top`, `bottom`

### manager

- `open`: `true`, `false`

## Cortex React component mapping

The following table maps every exported `@tecsinapse/cortex-react` component to the `@tecsinapse/cortex-core` primitive or styling primitive it uses.

- `Accordion`: no direct `@tecsinapse/cortex-core` primitive reference
- `Avatar`: no direct `@tecsinapse/cortex-core` primitive reference
- `Badge`: `badge`, `containerBadge`, `BadgeVariants`
- `Breadcrumbs`: no direct `@tecsinapse/cortex-core` primitive reference
- `Button`: `button`, `ButtonVariants`
- `Calendar`: no direct `@tecsinapse/cortex-core` primitive reference
- `Card`: `card`
- `Carousel`: no direct `@tecsinapse/cortex-core` primitive reference
- `Checkbox`: `checkbox`
- `ColorPicker`: no direct `@tecsinapse/cortex-core` primitive reference
- `Content`: no direct `@tecsinapse/cortex-core` primitive reference
- `Divider`: `divider`
- `Drawer`: `drawer`, `overlay`
- `GroupButton`: no direct `@tecsinapse/cortex-core` primitive reference
- `Hint`: `hint`, `HintVariants`
- `Input`: `input`, `inputBox`, `labelStyle`, `InputBaseVariants`
- `Kanban`: no direct `@tecsinapse/cortex-core` primitive reference
- `Loading`: no direct `@tecsinapse/cortex-core` primitive reference
- `Menubar`: no direct `@tecsinapse/cortex-core` primitive reference
- `Modal`: `modal`, `overlay`
- `Popover`: `popover`, `popoverContainer`, `popoverItem`
- `ProgressBar`: no direct `@tecsinapse/cortex-core` primitive reference
- `RadioButton`: `radioButtonStyles`
- `Select`: `selectVariants`, `option`, `checkbox`, `labelStyle`
- `Skeleton`: no direct `@tecsinapse/cortex-core` primitive reference
- `Snackbar`: `snackbar`, `SnackbarVariants`
- `Stepper`: no direct `@tecsinapse/cortex-core` primitive reference
- `Table`: `tRoot`, `tHead`, `tRow`, `tHeadCell`, `tCell`, `tFoot`, `hr`
- `Tag`: `tag`, `TagVariants`
- `TextArea`: `input`, `inputBox`, `labelStyle`, `InputBaseVariants`
- `TimePicker`: `inputBox`, `labelStyle`
- `Toggle`: `toggle`, `ToggleVariants`
- `Tooltip`: `tooltip`, `tooltipContainer`
- `Uploader`: `button`, `manager`
- `Autocomplete`: `selectVariants`, `option`
- `PhoneInput`: no direct `@tecsinapse/cortex-core` primitive reference

Use this mapping when an agent needs to connect a React component API to the underlying core styles, tokens, or variant props.

## Usage guidance for developer agents

- Reference tokens by their exported group and key name whenever possible.
- For color usage, prefer semantic tokens like `colors.primary.medium` or `colors.surface.overlay` instead of raw hex values.
- When a token includes a CSS variable fallback, use the variable expression to preserve theme overrides, e.g. `var(--color-primary-medium, #f89907)`.
- Use `fontSize` arrays for responsive text presets. The first value is typically the smaller size and the second value is the larger size.
- Use `spacing` tokens for margin, padding, and layout gaps to keep spacing consistent.
- Use `borderRadius` and `borderWidth` tokens for border styling across components.
- Use `zIndex` values for overlay ordering, and avoid hard-coded numbers outside the token set.
- Use `fontFamily.sans` and `fontFamily.mono` for typography defaults and code-style text.

## Cortex Core primitives in Cortex React

The `@tecsinapse/cortex-react` package is built on top of `@tecsinapse/cortex-core` primitives. The React components simply wrap or apply the primitives to provide a React-friendly API.

### Primitive → React component mapping

- `button` / `ButtonVariants` → `Button`
- `badge`, `containerBadge` → `Badge`
- `card` → `Card`
- `checkbox` → `Checkbox`
- `divider` → `Divider`
- `drawer`, `overlay` → `Drawer`
- `hint`, `HintVariants` → `Hint`
- `input`, `inputBox`, `labelStyle`, `InputBaseVariants` → `Input`, `TextArea`, `DatePicker`, `TimePicker`
- `radioButtonStyles` → `RadioButton`
- `selectVariants`, `option`, `checkbox` → `Select` and related option list components
- `snackbar`, `SnackbarVariants` → `Snackbar`
- `tag`, `TagVariants` → `Tag`
- `toggle`, `ToggleVariants` → `Toggle`
- `tooltip`, `tooltipContainer` → `Tooltip`
- `manager` → `Uploader` manager and other service UI components
- `modal`, `overlay` → `Modal`
- `popover`, `popoverContainer`, `popoverItem` → `Popover`

### How to use this mapping

- When a React component API mentions `ButtonVariants`, `HintVariants`, or `SnackbarVariants`, those types are re-exported from `@tecsinapse/cortex-core`.
- When a component uses `inputBox` and `labelStyle`, it is reusing core input layout primitives for controlled input and label rendering.
- `Select` and related list components reuse `selectVariants` and `option` from `@tecsinapse/cortex-core` to keep dropdown styling consistent with core primitives.
- `Drawer`, `Modal`, and `Popover` share overlay and panel primitives from core so React wrappers inherit the same base transitions and positioning.

## Implementation note

The tokens are defined in `packages/cortex-core/src/tokens/definitions.ts` and re-exported from `packages/cortex-core/src/index.ts`.

This document is intended for developer agents to answer styling, token selection, and theme usage questions reliably.
