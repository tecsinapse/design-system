# cortex-native — first-class `className` + composition API — Design

Date: 2026-09-02
Status: Approved

## Purpose

Make `@tecsinapse/cortex-native` a package whose components (a) accept `className` as a real, override-capable prop,
(b) extend the props of the React Native primitive they render — the way a web `Button` extends
`ButtonHTMLAttributes<HTMLButtonElement>` — and (c) expose compound/composition APIs for the components whose current
props exist only to inject inner parts.

Hard constraint: **no existing component, prop, or export breaks.** cortex-native must remain a drop-in replacement
for the deprecated `@tecsinapse/react-native-kit` (setup/config changes plus the documented intentional divergences
only), while offering materially better DX than the legacy emotion stack.

## Current state (evidence)

Package: 54 exported components (26 atoms, 25 molecules, 3 PieChart), all default-exported and re-exported flat from
`packages/cortex-native/src/index.ts` (249 lines).

- **`className` is accidental, not designed.** 30 components extend an RN props type (`ViewProps`, `PressableProps`,
  `TextInputProps`, `ScrollViewProps`) and therefore *type-accept* `className` via the `uniwind/types` augmentation
  (`src/uniwind.d.ts:1`) — but only ~15 actually merge it into their output.
- **19 components accept no `className` at all**, including `Button` (`Button.tsx:16` — `VariantProps` plus six
  hand-picked props), `Icon`, `Badge`, `Switch`, `GroupButton`, `CardHeader`/`CardFooter`, `IconTextButton`, `Select`,
  `DateTimePicker`, `ScrollableSelector`, `PieChart`.
- **Some silently drop it.** `Card.tsx:28` declares a local `const className` that shadows the incoming prop; the
  non-pressable branch (`Card.tsx:52-56`) drops `...rest` entirely. `Header.tsx:59` hardcodes its className after
  spreading `...rest`, so a consumer's className is overwritten.
- **Merge semantics are the real blocker.** All 21 class-composing files use `clsx`, which concatenates without
  resolving Tailwind conflicts. `<Paper className="bg-red-500" />` emits `bg-surface-overlay rounded-mili bg-red-500`
  and the winner is decided by CSS source order, not prop order — consumer overrides are unreliable by construction.
- **RN inline `style` beats a uniwind `className`.** Documented in the codebase itself at
  `PressableSurface.tsx:35-41`, which now emits inline `backgroundColor` *only* when `surfaceColor` is passed, because
  a blanket inline background was breaking `MonthWeek`, `SelectYear`, and Calendar day cells that paint via className.
  `Card.tsx:44-45` passes `surfaceColor` explicitly, making `Card` the component where a consumer
  `className="bg-brand"` is guaranteed to lose.
- **Only 5 components forward refs** (`Input`, `InputElement`, `InputMask`, `InputMaskElement`, `InputPassword`).
- **Zero namespace compounds.** `Card`'s `Header`/`Footer` are flat named exports (`Card.tsx:60-61`) re-exported as
  `CardHeader`/`CardFooter` (`index.ts:27-36`); `Card.Header` does not exist.
- **`tailwind-merge` is not a direct dependency** of `cortex-core` (deps: `clsx`, `currency.js`, `date-fns`,
  `polished`, `tailwind-variants`) and is not hoisted. The `tv` factory at `cortex-core/src/tv.ts:22` already carries
  the required `twMergeConfig`, which registers the custom typography scale in tailwind-merge's `font-size` group —
  without it, `text-h1` is misclassified as a text-color utility and silently dropped whenever a color class appears in
  the same output (`tv.ts:8-18`, regression test at `Text.test.tsx:61`).

Web sibling conventions to mirror (`packages/cortex-react`): props extend the DOM element props
(`ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>`, `Button.tsx:5`); `className` is passed *into* the
recipe (`button({ intent, variant, size, className })`); 13 compounds are exported as plain namespace objects
(`Input = { Root, Face, Box, Left, Right, Search, Mask }`, `Input/index.ts:9-17`; also `Select`, `Accordion`,
`Autocomplete`, `Popover`, `Tag`, `Stepper`, `Menubar`, `Kanban`, `ColorPicker`, `Uploader`, `PhoneInput`, `TextArea`);
`tv({ slots })` recipes exist in `cortex-core` (`select/select.ts:15`, `radio-button/radio-button.ts:3`). Web semantics:
`Face` = bordered visual wrapper, `Box` = the actual input element, `Root` = convenience composing the two
(`Input/Root.tsx:10-12`).

`react-native-kit` parity note: the legacy package re-exported `react-core` wholesale; cortex-native is *wider*
(~85 exports). No legacy public API is absent. Intentional divergences (fontColor/fontWeight token renames,
`Button` `color`/`tone`/`state` → `intent`/`variant`/`loading`, self-contained `DatePicker`/`DateTimePicker`, RFValue
dropped, date-fns v4) are already documented in `docs/setup/cortex-native.mdx` and mechanized in
`.agents/skills/cortex-native-migration/references/component-mapping.md`.

## Decisions (approved)

1. **Inner styling reaches inner parts through composition only.** `className` lives on the root of each component.
   There is no `classNames` slot map and no `containerClassName`/`inputClassName`-style flat per-part props. Consumers
   who need to style an inner part compose it.
2. **Parts are exposed as statics on the callable component.** `Input` stays a function with its legacy prop API;
   `Object.assign` hangs `Input.Root`, `Input.Face`, `Input.Box`, … off it, with `Input.Root === Input`. Not a plain
   namespace object (that would break every existing consumer), and not duplicated as flat exports for new parts.
   Existing flat exports (`InputContainer`, `InputElement`, `Hint`, `PressableInputContainer`, `CardHeader`,
   `CardFooter`) remain exported for drop-in compatibility and become documented aliases of the statics.
3. **No `forwardRef`.** `cortex-native/package.json:39` pins `"react": ">=19.0.0"` (and `react-native >=0.86.0`,
   `react-test-renderer` 19.2.3), so `ref` is an ordinary prop. The 5 existing `forwardRef` wrappers are unwrapped;
   `ref` remains a prop either way, so no consumer breaks.
4. **Composition scope is Tier 1 only** — the seven compounds whose props exist *solely* to inject inner parts:
   `Button`, `Input` (one shared part set also serving `InputMask`, `InputPassword`, `TextArea`, and `PhoneInput`),
   `Select`, `Card`, `Header`, `Snackbar`, `Tag`. Tier 2 (`BottomNavigator`, `GroupButton`, `Avatar`,
   `IconTextButton`, `Badge`, `Calendar`) and Tier 3 leaves (`Divider`, `Paper`, `Icon`, `Switch`, `Checkbox`,
   `RadioButton`, `ProgressBar`, `Skeleton`, `Grid`, `DatePicker`, `DateTimePicker`, `ScrollableSelector`, `PieChart`,
   `Modal`) get the `className` + RN-props treatment but no parts. Adding parts to a leaf whose entire styling surface
   is its root would be abstraction with no consumer forcing it.
5. **Precedence is three ordered layers, and internal inline styles are purged where they encode theme or layout.**
   Recipe/variant classes → consumer `className` (twMerge, consumer wins) → consumer `style` (absolute, RN semantics).
   Animation-driven and measured inline styles stay inline.
6. **Superseded injection props keep working and are annotated with `@see`, not `@deprecated`.** Flagging props as
   deprecated while consumers are actively porting `react-native-kit` code onto them creates friction against the
   primary drop-in goal. `@see` → `@deprecated` is a one-line change per prop once the migration wave is done.
7. **No legacy prop aliases.** No `color`+`tone` → `intent` or `state` → `loading` shims on `Button`. Those renames are
   intentional divergences already documented and mechanized; shims would make the divergence permanent and the API
   dual. `Button` does gain `children` as an additive alternative to `title` — legacy passed children, so this serves
   drop-in *and* underpins `Button.Icon`/`Button.Label`.
8. **The monolith is built from its own parts.** `X.Root === X` renders the public parts internally, exactly as web's
   `Input/Root.tsx:10-12` does. One implementation, so the flat path and the composed path cannot drift.

## §1 Foundation — the class layer

Add **`cn`** to `cortex-core`, sharing the exact `twMergeConfig` used by `tv`:

- Extract the config object in `cortex-core/src/tv.ts` to a named const.
- Feed it to both `createTV` and a module-scope merge function. Because `tailwind-merge` is not a direct dependency and
  is not hoisted, derive the merger from `tv` itself (module-scope `const merge = tv({})`, then
  `cn = (...inputs: ClassValue[]) => merge({ class: clsx(inputs) })`) rather than adding a dependency whose version has
  to track tailwind-variants' internal one.
- Export `cn` from `cortex-core`'s barrel so both `cortex-react` and `cortex-native` can use it.

Sharing the config is not stylistic: it is what prevents the custom-typography-drop bug that `tv.ts:8-18` documents.

Then, mechanically across the 21 class-composing files: `clsx(` → `cn(`, with the consumer's `className` appended as
the final argument.

**Invariant:** the consumer's `className` is always the last argument to `cn`, in every component, at every level.

## §2 Prop contract — extend the primitive

Every props interface extends the RN primitive it renders:

| Component(s) | Base props |
|---|---|
| `Text` (standalone today, `Text.tsx:14`), `Icon` (renders a vector-icon glyph) | `TextProps` |
| `Button`, `PressableSurface`, interactive `Card` | `PressableProps` |
| `Paper`, `Divider`, `BoxContent`, `Tag`, `Header`, `Grid`, `Badge`, `Checkbox`, `RadioButton`, `Switch`, `Snackbar`, `Skeleton`, `ProgressBar` | `ViewProps` |
| `InputElement`, `InputMaskElement`, `TextArea` | `TextInputProps` |
| `SnappingSlider` | `ScrollViewProps` |

Rules:

1. **Delete shadowing redeclarations.** `Button.tsx:21` and `Card.tsx:16` redeclare `style?: StyleProp<ViewStyle>`;
   `testID` is hand-declared in roughly eight components. Both come from the base.
2. **Ref is a prop.** Preferred base spelling is `React.ComponentProps<typeof View>`, which under React 19 typings
   carries `ref`. **To verify at implementation time against RN 0.86's own `.d.ts`:** if `ComponentProps` does not
   surface `ref` there, each props interface declares `ref?: React.Ref<View>` (or `TextInput`, etc.) explicitly. Either
   way it is a plain prop with no wrapper component.
3. **Additive only.** No existing prop is removed or retyped narrower. `Button` gains `children`; `title` stays and
   becomes optional when children are present.
4. `Card`'s non-pressable branch (`Card.tsx:52-56`) starts spreading `...rest`, which it drops today.

## §3 Compound API mechanics

Shape: `export const Button = Object.assign(ButtonRoot, { Root: ButtonRoot, Label: ButtonLabel, Icon: ButtonIcon })`.
`<Button title="x" />` and `<Button.Root title="x" />` both work; `<Button.Root>` is the spelling that also compiles
against `cortex-react`. Each part declares a `displayName` for RTL queries and Storybook.

React Context is introduced only where parts share state, each with a throwing `useXContext()` guard mirroring web:

| Compound | Parts | Context carries |
|---|---|---|
| `Button` | `Root`, `Label`, `Icon` | `intent`/`variant` → foreground color, moving the `useCSSVariable` + `style={{ color }}` plumbing at `Button.tsx:36-38,59` out of the root |
| `Input` (shared by `InputMask`, `InputPassword`, `TextArea`, `PhoneInput`) | `Root`, `Face`, `Box`, `Label`, `Hint`, `Left`, `Right` | `focused`, `disabled`, `variant` from `useInputFocus` |
| `Select` | `Root`, `Trigger`, `Sheet`, `Search`, `Options`, `Option`, `Confirm` | open state, `value`, `keyExtractor`/`labelExtractor`, `type` |
| `Card` | `Root`, `Header`, `Body`, `Footer` | none (`Header`/`Footer` already exist at `Card.tsx:60-61`) |
| `Header` | `Root`, `Left`, `Title`, `Right` | none |
| `Snackbar` | `Root`, `Icon`, `Content`, `Action`, `Progress` | `colorVariant`/`colorTone` for icon tint |
| `Tag` | `Root`, `Icon`, `Label`, `Close` | dismiss animation handle |

Naming follows web (`Root`, `Trigger`, `Options`, `Option`, `Left`, `Right`, `Label`, `Close`) with one deliberate
divergence: **`Select.Sheet`, not web's `Select.Popover`** — native renders a bottom-sheet `Modal`
(`Select.tsx:110-136`), and "popover" would misdescribe it. `Input.Face` = bordered container (today's
`InputContainer`), `Input.Box` = the `TextInput` (today's `InputElement`), matching
`cortex-react/src/components/Input/{Face,Box}.tsx`.

Monoliths are rebuilt on their parts. `Input.tsx:70`'s hardcoded `LabelComponent={Text}` injection goes away —
`Input.Label` owns that. `Header`'s internal `DummyButton` spacer (`Header.tsx:38-44`) stays private to the monolith
path; under composition the consumer places their own spacers.

## §4 Inline-style purge — making §1's precedence real

| Site | Today | Becomes |
|---|---|---|
| `Card.tsx:44-45` | passes `surfaceColor`, so `PressableSurface` emits inline `backgroundColor` that beats consumer className | paint via className; press feedback via `effectStyle`. `PressableSurface.tsx:42-51`'s opt-in inline behavior is untouched for other callers |
| `Input.tsx:54-57` | `minHeight: 50` inline | `min-h-[50px]` on `Input.Face` |
| `Header.tsx:32,42` | `aspectRatio: 1, height: 49` inline | `aspect-square h-[49px]` |
| `Header.tsx:59` | hardcoded className overwrites the consumer's | `cn(..., className)` |
| `Select.tsx:118,123-131` | inline `flex`, `backgroundColor: 'rgba(0,0,0,0.5)'`, `height: '88%'` | `flex-1 bg-black/50`, `flex-1 justify-end`, `h-[88%]` |
| `Tag.tsx:80` | `marginLeft: 2` | `ml-[2px]` on `Tag.Close` |

Stays inline, deliberately — per-frame or measured values, not themeable tokens: `Animated` opacity (`Tag.tsx:63`,
Snackbar fade), `ProgressBar` computed width, `Skeleton` measured width/height, `Switch` animated color,
`Select`'s keyboard/`bottomInset` padding.

Regression watch: `PressableSurface.tsx:35-41` explicitly names `MonthWeek`, `SelectYear`, and Calendar day cells as
the surfaces that broke the last time inline backgrounds were touched. Tests covering those land *before* the `Card`
change.

## §5 Verification

Existing stack only — jest + `@testing-library/react-native`, co-located `*.test.tsx`
(`pnpm --filter @tecsinapse/cortex-native test`). No new tooling.

1. **Merge/override, table-driven across all 54 roots:** `<X className="bg-red-500" />` produces a class string
   containing `bg-red-500` and *not* the component's base `bg-*`. This single test proves the headline feature; `clsx`
   fails it today, `cn` passes.
2. **`style` beats `className`** — ordering contract asserted on `Card`, `Input`, `Header`.
3. **Ref without `forwardRef`** — `ref.current` is a real `TextInput` for all five previously-wrapped components.
4. **Monolith ≡ composed** — for each Tier 1 compound, the monolith's rendered tree matches the hand-composed
   equivalent. This is what keeps the two paths from drifting.
5. **Legacy props still function** — `leftComponent`, `rightComponent`, `hintComponent`, `LabelComponent`,
   `controlComponent`, `leftIcon`/`rightIcon`, `icon`, `leftButton`/`rightButton`.
6. **Background regression tests** for Calendar day cells, `SelectYear`, and `MonthWeek`, landing before §4's `Card`
   and `PressableSurface` changes.

Smoke test: `rn-playground` screens exercising each Tier 1 compound, with the app actually launched. Then
`pnpm lint:fix` and `pnpm --filter @tecsinapse/cortex-native build:dts`.

## §6 Rollout

Four phases, each independently shippable:

1. **Foundation** (mechanical, all 54 components) — `cn` in `cortex-core`; `clsx` → `cn` with `className` last; prop
   bases extend RN primitives; `forwardRef` unwrapped; shadowing `style`/`testID` deleted. No public API removed. This
   phase is what makes the drop-in claim honest.
2. **Tier 1 compounds** — Input family first (one part set serves five components), then `Select`, `Card`, `Button`,
   `Header`, `Snackbar`, `Tag`. Monoliths rebuilt on their parts.
3. **Inline purge + regression tests** — §4, gated behind §5.6.
4. **Docs** — a className/composition section in `docs/setup/cortex-native.mdx`; a "composed equivalent" column in
   `.agents/skills/cortex-native-migration/references/component-mapping.md`; `@see` JSDoc on the ~12 superseded
   injection props; composed-usage stories under `packages/cortex-native/docs/`.

## Risks and open questions

- **`ComponentProps<typeof View>` and `ref`** — needs verification against RN 0.86 + React 19 typings; fallback is an
  explicit `ref?:` declaration per props interface (§2 rule 2).
- **Inline-background regressions** — the `Card`/`PressableSurface` change touches the exact code path that previously
  broke Calendar surfaces. Mitigated by ordering: tests first (§5.6), then the change.
- **twMerge and uniwind class ordering** — twMerge resolves conflicts by *removing* the losing classes from the string,
  so correctness no longer depends on CSS source order. This is precisely why `cn` (not `clsx`) is the foundation.
- **Two supported spellings per Tier 1 component** — monolith and composed. Mitigated structurally by decision 8 (the
  monolith renders the parts) and by the §5.4 equivalence test, rather than by documentation discipline.
- **`Select`'s parts are the largest unknown** — its state lives in `useSelect`/`useModal` hooks
  (`Select/hooks/`), and splitting `SelectModal` (`Select/components/Modal.tsx`) into `Sheet`/`Search`/`Options`/
  `Option`/`Confirm` is the most invasive item in phase 2. Sequence it last within that phase.
