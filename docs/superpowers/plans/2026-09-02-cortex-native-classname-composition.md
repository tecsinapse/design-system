# cortex-native className + Composition Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make every `@tecsinapse/cortex-native` component accept an override-capable `className`, extend the props of the React Native primitive it renders, and expose composition parts for the seven components whose props exist only to inject inner parts — without breaking a single existing prop or export.

**Architecture:** A shared `cn()` merger in `cortex-core` (built from the same `twMergeConfig` as `tv`, so Tailwind conflicts resolve with the consumer's classes winning) replaces `clsx` at all 21 class-composing sites, with `className` always the last argument. Props interfaces extend `ViewProps`/`PressableProps`/`TextProps`/`TextInputProps`/`ScrollViewProps`, `ref` becomes a plain prop (React 19), and Tier 1 components gain parts attached as statics on the still-callable component (`Card.Root === Card`), with the monolith rebuilt on top of its own parts so the two paths cannot drift.

**Tech Stack:** React 19, React Native 0.86, uniwind (Tailwind v4 for RN), tailwind-variants 3.3.1 via `@tecsinapse/cortex-core`'s `tv`, jest + `@testing-library/react-native` (cortex-native), vitest + jsdom (core-facing tests, run from cortex-react), pnpm workspace + lerna-lite.

**Spec:** `docs/superpowers/specs/2026-09-02-cortex-native-classname-composition-design.md`

## Global Constraints

- **No breaking changes.** No existing prop is removed, renamed, or retyped narrower. No export is removed. Every change is additive or internal.
- **Peer floors (already set, do not change):** `react >=19.0.0`, `react-native >=0.86.0`, `uniwind ^1.10.0` (`packages/cortex-native/package.json:38-45`).
- **`ref` is a plain prop.** React 19 — never add `React.forwardRef`; remove the existing five.
- **Always import `tv` and `cn` from `@tecsinapse/cortex-core`**, never from `tailwind-variants` or `tailwind-merge` directly. The shared factory registers the custom typography scale in tailwind-merge's `font-size` group; bypassing it silently drops `text-h1`-style classes (`packages/cortex-core/src/tv.ts:8-18`).
- **No new dependency.** `tailwind-merge` is not a direct dep of `cortex-core` and is not hoisted; the merger is derived from `tv` itself.
- **No `@emotion/*` imports anywhere in cortex-native.**
- **Consumer `className` is always the last argument to `cn`.**
- **Precedence contract:** recipe/variant classes → consumer `className` (twMerge, consumer wins) → consumer `style` (absolute, RN semantics). Never emit an inline style for something expressible as a class, except per-frame/measured values (`Animated` opacity, `ProgressBar` computed width, `Skeleton` measured w/h, `Switch` animated color, `Select` keyboard/safe-area padding).
- **Test commands:** cortex-native → `pnpm --filter @tecsinapse/cortex-native test` (single test: `... test -t '<name>'`). Core-facing → `pnpm --filter @tecsinapse/cortex-react test`. Type-check → `pnpm --filter <pkg> build:dts`. There is no typecheck script.
- **Do not run `pnpm lint`** during tasks — it is `eslint --fix --quiet` and rewrites files. Use `pnpm lint:ts` to check. Full `pnpm lint:fix` runs once at the end (Task 18).
- **Never bump versions manually.** Releases are automatic on PR merge. Conventional commits only (`feat(cortex-native): ...`, `fix(...)`, `docs(...)`, `test(...)`, `refactor(...)`).
- **Stories** (`packages/cortex-native/docs/*.stories.tsx`) are excluded from tsconfig and eslint — they are neither typechecked nor linted.

---

## File Structure

**Created:**

| File | Responsibility |
|---|---|
| `packages/cortex-core/src/cn.ts` | `cn()` — Tailwind-conflict-resolving class merger sharing `tv`'s `twMergeConfig`. |
| `packages/cortex-react/src/tests/cn.test.ts` | Unit tests for `cn` (vitest; cortex-core has no test runner of its own, and this config aliases `@tecsinapse/cortex-core` → its `src`). |
| `packages/cortex-native/src/className.contract.test.tsx` | Table-driven contract: every component forwards `className`, and the consumer's class beats the component's base class. |
| `packages/cortex-native/src/components/atoms/Button/ButtonContext.tsx` | Shares `intent`/`variant` → resolved foreground color with `Button.Label`/`Button.Icon`. |
| `packages/cortex-native/src/components/atoms/Button/Label.tsx` | `Button.Label`. |
| `packages/cortex-native/src/components/atoms/Button/Icon.tsx` | `Button.Icon`. |
| `packages/cortex-native/src/components/atoms/Card/Body.tsx` | `Card.Body`. |
| `packages/cortex-native/src/components/atoms/Input/InputContext.tsx` | Shares `focused`/`disabled`/`variant` with the Input parts. |
| `packages/cortex-native/src/components/atoms/Input/Label.tsx` | `Input.Label` — owns what `InputContainer`'s `LabelComponent` injection did. |
| `packages/cortex-native/src/components/atoms/Input/Left.tsx` | `Input.Left`. |
| `packages/cortex-native/src/components/atoms/Input/Right.tsx` | `Input.Right`. |
| `packages/cortex-native/src/components/molecules/Header/Left.tsx` | `Header.Left`. |
| `packages/cortex-native/src/components/molecules/Header/Title.tsx` | `Header.Title`. |
| `packages/cortex-native/src/components/molecules/Header/Right.tsx` | `Header.Right`. |
| `packages/cortex-native/src/components/molecules/Snackbar/SnackbarContext.tsx` | Shares `colorVariant`/`colorTone` with `Snackbar.Icon`/`Action`. |
| `packages/cortex-native/src/components/molecules/Snackbar/Content.tsx` | `Snackbar.Content`. |
| `packages/cortex-native/src/components/molecules/Snackbar/SnackbarIcon.tsx` | `Snackbar.Icon`. |
| `packages/cortex-native/src/components/molecules/Snackbar/Action.tsx` | `Snackbar.Action` (the dismiss affordance). |
| `packages/cortex-native/src/components/atoms/Tag/TagContext.tsx` | Shares the dismiss handle with `Tag.Close`. |
| `packages/cortex-native/src/components/atoms/Tag/Label.tsx` | `Tag.Label`. |
| `packages/cortex-native/src/components/atoms/Tag/TagIcon.tsx` | `Tag.Icon`. |
| `packages/cortex-native/src/components/atoms/Tag/Close.tsx` | `Tag.Close`. |
| `packages/cortex-native/src/components/molecules/Select/SelectContext.tsx` | Shares open state, `value`, extractors, `type` with the Select parts. |
| `packages/cortex-native/src/components/molecules/Select/parts/Trigger.tsx` | `Select.Trigger`. |
| `packages/cortex-native/src/components/molecules/Select/parts/Sheet.tsx` | `Select.Sheet` — the bottom-sheet `Modal` + backdrop. |
| `packages/cortex-native/src/components/molecules/Select/parts/Search.tsx` | `Select.Search`. |
| `packages/cortex-native/src/components/molecules/Select/parts/Options.tsx` | `Select.Options` — flat/sectioned list host. |
| `packages/cortex-native/src/components/molecules/Select/parts/Confirm.tsx` | `Select.Confirm`. |

**Modified (compound assembly happens in the existing monolith file, matching `Card.tsx:60-61`'s established pattern):** `packages/cortex-core/src/index.ts`, `packages/cortex-core/src/tv.ts`, all 21 `clsx`-composing files in `packages/cortex-native/src/components/**`, `packages/cortex-native/src/index.ts`, `docs/setup/cortex-native.mdx`, `.agents/skills/cortex-native-migration/references/component-mapping.md`.

---

## Task 1: `cn` in cortex-core

**Files:**
- Create: `packages/cortex-core/src/cn.ts`
- Modify: `packages/cortex-core/src/tv.ts:22` (extract the config to a named export)
- Modify: `packages/cortex-core/src/index.ts:4` (add the barrel line)
- Test: `packages/cortex-react/src/tests/cn.test.ts`

**Interfaces:**
- Consumes: `tv` from `packages/cortex-core/src/tv.ts:22`.
- Produces: `export const cn: (...inputs: ClassValue[]) => string` and `export const twMergeConfig` from `@tecsinapse/cortex-core`. Every later task imports `cn` from `@tecsinapse/cortex-core`.

Background: `clsx` concatenates and never resolves Tailwind conflicts, so `<Paper className="bg-red-500" />` currently emits `bg-surface-overlay rounded-mili bg-red-500` and the winner depends on CSS source order. `cn` runs the joined string through tailwind-merge with the *same* config `tv` uses, which both resolves the conflict (last wins) and preserves the custom typography scale.

- [ ] **Step 1: Write the failing test**

Create `packages/cortex-react/src/tests/cn.test.ts`:

```ts
import { cn } from '@tecsinapse/cortex-core';

describe('cn', () => {
  it('lets the consumer class win over a conflicting base class', () => {
    expect(cn('bg-surface-overlay rounded-mili', 'bg-red-500')).toBe(
      'rounded-mili bg-red-500'
    );
  });

  it('keeps custom typography sizes alongside a color class', () => {
    expect(cn('text-h1', 'text-success-medium')).toBe(
      'text-h1 text-success-medium'
    );
  });

  it('resolves conflicts within a single argument', () => {
    expect(cn('p-2 p-4')).toBe('p-4');
  });

  it('drops falsy values and accepts objects and nested arrays', () => {
    expect(cn(undefined, false, null, 'flex-1')).toBe('flex-1');
    expect(cn('flex-1', { 'bg-red-500': true, 'bg-blue-500': false })).toBe(
      'flex-1 bg-red-500'
    );
    expect(cn(['border-t', undefined], 'border-t-0')).toBe('border-t-0');
  });

  it('returns an empty string when given nothing', () => {
    expect(cn()).toBe('');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm --filter @tecsinapse/cortex-react test -t 'cn'`
Expected: FAIL — `cn` is not exported from `@tecsinapse/cortex-core`.

- [ ] **Step 3: Extract the twMerge config in `tv.ts`**

In `packages/cortex-core/src/tv.ts`, pull the object literal currently inline at line 22 into a named export, then pass it to `createTV`. Keep the existing explanatory comment above `tv` exactly as-is.

```ts
export const twMergeConfig = {
  classGroups: {
    'font-size': [
      {
        text: [
          ...Object.keys(fontSize),
          'xs', 'sm', 'base', 'lg', 'xl',
          '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', '8xl', '9xl',
        ],
      },
    ],
  },
};

export const tv = createTV({ twMergeConfig });
```

- [ ] **Step 4: Write `cn`**

Create `packages/cortex-core/src/cn.ts`:

```ts
import type { ClassValue } from 'clsx';

import { tv } from './tv';

/**
 * Tailwind-conflict-resolving class merger. Drop-in replacement for `clsx`
 * that additionally removes losing classes when two arguments conflict, so
 * a consumer's `className` reliably overrides a component's base classes
 * instead of depending on CSS source order.
 *
 * Derived from `tv` on purpose: it shares the `twMergeConfig` that teaches
 * tailwind-merge our custom typography scale (`text-h1`, `text-label`, ...).
 * A separately-constructed merger would misclassify those as text colors and
 * silently drop them whenever a color class appears in the same output.
 *
 * Callers must pass the consumer's `className` LAST — merge order decides the
 * winner.
 */
const merge = tv({});

export const cn = (...inputs: ClassValue[]): string =>
  merge({ class: inputs }) ?? '';
```

If `tsc` rejects the `class: inputs` assignment, import `ClassValue` from `tailwind-variants` instead of `clsx` — the two are structurally the same recursive union, and `tailwind-variants` is already a direct dependency.

- [ ] **Step 5: Export it from the barrel**

In `packages/cortex-core/src/index.ts`, add after line 4 (`export * from './tv';`):

```ts
export * from './cn';
```

- [ ] **Step 6: Run test to verify it passes**

Run: `pnpm --filter @tecsinapse/cortex-react test -t 'cn'`
Expected: PASS, 5 tests.

- [ ] **Step 7: Type-check both consumers**

Run: `pnpm --filter @tecsinapse/cortex-core build:dts && pnpm --filter @tecsinapse/cortex-react test`
Expected: clean `dts` emit; the full cortex-react suite still green (no regression from the `tv.ts` refactor).

- [ ] **Step 8: Commit**

```bash
git add packages/cortex-core/src/cn.ts packages/cortex-core/src/tv.ts packages/cortex-core/src/index.ts packages/cortex-react/src/tests/cn.test.ts
git commit -m "feat(cortex-core): add cn class merger sharing tv's twMerge config"
```

---

## Task 2: className contract test for atoms (RED) + atom sweep (GREEN)

**Files:**
- Create: `packages/cortex-native/src/className.contract.test.tsx`
- Modify (16 atoms): `Text/Text.tsx:50`, `Button/Button.tsx:46`, `Icon/Icon.tsx`, `Divider/Divider.tsx:18`, `BoxContent/BoxContent.tsx:24`, `Paper/Paper.tsx:18`, `Tag/Tag.tsx:53`, `Badge/Badge.tsx:36`, `Checkbox/Checkbox.tsx:42`, `RadioButton/RadioButton.tsx:56`, `PressableSurface/PressableSurface.tsx:69`, `ProgressBar/ProgressBar.tsx:56`, `Avatar/Avatar.tsx`, `Skeleton/Skeleton.tsx:58`, `GroupButton/GroupButton.tsx:100`, `Card/Header.tsx:10`, `Card/Footer.tsx:10` — all under `packages/cortex-native/src/components/atoms/`

**Interfaces:**
- Consumes: `cn` from `@tecsinapse/cortex-core` (Task 1).
- Produces: the contract test file, extended by Task 3 with molecules. Establishes the rule every later task follows: `className={cn(<base>, <conditionals>, className)}`.

- [ ] **Step 1: Write the failing test**

Create `packages/cortex-native/src/className.contract.test.tsx`. Every entry supplies that component's minimal valid props (verified against each props interface):

```tsx
import React from 'react';
import { render } from '@testing-library/react-native';

import Avatar from './components/atoms/Avatar/Avatar';
import Badge from './components/atoms/Badge/Badge';
import BoxContent from './components/atoms/BoxContent/BoxContent';
import Button from './components/atoms/Button/Button';
import CardFooter from './components/atoms/Card/Footer';
import CardHeader from './components/atoms/Card/Header';
import Checkbox from './components/atoms/Checkbox/Checkbox';
import Divider from './components/atoms/Divider/Divider';
import GroupButton from './components/atoms/GroupButton/GroupButton';
import Icon from './components/atoms/Icon/Icon';
import Paper from './components/atoms/Paper/Paper';
import PressableSurface from './components/atoms/PressableSurface/PressableSurface';
import ProgressBar from './components/atoms/ProgressBar/ProgressBar';
import RadioButton from './components/atoms/RadioButton/RadioButton';
import Skeleton from './components/atoms/Skeleton/Skeleton';
import Tag from './components/atoms/Tag/Tag';
import Text from './components/atoms/Text/Text';

const TID = 'contract-root';

type Case = {
  name: string;
  render: (props: { testID: string; className: string }) => React.ReactElement;
  /** Base class the consumer's class must defeat, when the root sets one. */
  defeats?: string;
};

const atoms: Case[] = [
  { name: 'Text', render: p => <Text {...p}>t</Text> },
  { name: 'Button', render: p => <Button {...p} title="t" /> },
  { name: 'Icon', render: p => <Icon {...p} name="check" type="ionicon" /> },
  { name: 'Divider', render: p => <Divider {...p} /> },
  {
    name: 'BoxContent',
    render: p => <BoxContent {...p} variant="top" />,
    defeats: 'bg-surface-overlay',
  },
  { name: 'Paper', render: p => <Paper {...p} />, defeats: 'bg-surface-overlay' },
  { name: 'Tag', render: p => <Tag {...p} value="t" /> },
  { name: 'Badge', render: p => <Badge {...p} value={1} /> },
  { name: 'Checkbox', render: p => <Checkbox {...p} /> },
  { name: 'RadioButton', render: p => <RadioButton {...p} /> },
  { name: 'PressableSurface', render: p => <PressableSurface {...p} /> },
  { name: 'ProgressBar', render: p => <ProgressBar {...p} valueNow={50} /> },
  { name: 'Avatar', render: p => <Avatar {...p} name="Ada Lovelace" /> },
  { name: 'Skeleton', render: p => <Skeleton {...p} /> },
  {
    name: 'GroupButton',
    render: p => (
      <GroupButton
        {...p}
        value="a"
        options={[{ value: 'a' }, { value: 'b' }]}
        renderKey={option => option}
        renderOption={option => <Text>{option}</Text>}
        onChange={() => undefined}
      />
    ),
  },
  { name: 'CardHeader', render: p => <CardHeader {...p} /> },
  { name: 'CardFooter', render: p => <CardFooter {...p} /> },
];

describe.each(atoms)('$name className contract', ({ render: renderCase, defeats }) => {
  it('forwards the consumer className to its root', () => {
    const { getByTestId } = render(
      renderCase({ testID: TID, className: 'mt-kilo' })
    );
    expect(getByTestId(TID).props.className as string).toContain('mt-kilo');
  });

  if (defeats) {
    it(`lets the consumer class defeat ${defeats}`, () => {
      const { getByTestId } = render(
        renderCase({ testID: TID, className: 'bg-red-500' })
      );
      const className = getByTestId(TID).props.className as string;
      expect(className).toContain('bg-red-500');
      expect(className).not.toContain(defeats);
    });
  }
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm --filter @tecsinapse/cortex-native test -t 'className contract'`
Expected: FAIL. Compile errors on `Button`/`Icon`/`Badge`/`Checkbox`/`RadioButton`/`Avatar`/`GroupButton`/`CardHeader`/`CardFooter` (no `className` in their props), plus assertion failures where `clsx` concatenated instead of merged.

- [ ] **Step 3: Apply the sweep to every atom**

For each modified file, three edits:

1. Replace the import — `import { clsx } from 'clsx';` → `import { cn } from '@tecsinapse/cortex-core';`
2. Destructure `className` from props and pass it as the final `cn` argument.
3. Where the root has no class composition today (`Button`, `Icon`, `Badge`, `Checkbox`, `RadioButton`, `Avatar`, `GroupButton`, `Card/Header`, `Card/Footer`), add one.

`Paper.tsx` is the model — it already destructures `className` and appends it, so only `clsx` → `cn` changes:

```tsx
import { cn } from '@tecsinapse/cortex-core';

const Paper = ({ children, elevated = false, className, ...rest }: PaperProps) => (
  <View
    {...rest}
    className={cn('bg-surface-overlay rounded-mili', elevated && 'shadow-default', className)}
  >
    {children}
  </View>
);
```

`Card/Header.tsx` shows the "no class composition yet" shape (`Footer.tsx` is identical with `FooterProps`/`Footer`):

```tsx
import React from 'react';
import { View, ViewProps } from 'react-native';
import { cn } from '@tecsinapse/cortex-core';

export interface HeaderProps extends ViewProps {}

const Header = ({ children, className, ...rest }: HeaderProps): React.ReactElement => (
  <View {...rest} className={cn(className)}>
    {children}
  </View>
);

export default Header;
```

`Button.tsx:46` currently passes the recipe result straight through; route it through `cn` with `className` last:

```tsx
className={cn(buttonStyles({ intent, variant, size }), className)}
```

`Text.tsx:50`, `Tag.tsx:53`, `Divider.tsx:18`, `Skeleton.tsx:58`, `BoxContent.tsx:24`, `ProgressBar.tsx:56`, `Checkbox.tsx:42`, `RadioButton.tsx:56`, `GroupButton.tsx:100`: same shape — swap `clsx` for `cn`, append `className`.

`Card/Card.tsx` is deliberately **not** in this task; its local `const className` shadowing (`Card.tsx:28`) is resolved in Task 7 when it becomes a compound.

- [ ] **Step 4: Run the contract test**

Run: `pnpm --filter @tecsinapse/cortex-native test -t 'className contract'`
Expected: PASS for all 17 atom cases.

- [ ] **Step 5: Run the whole native suite**

Run: `pnpm --filter @tecsinapse/cortex-native test`
Expected: PASS. `Text.test.tsx:61` (the twMerge typography regression) must still pass — it is the canary that `cn` shares `tv`'s config.

- [ ] **Step 6: Commit**

```bash
git add packages/cortex-native/src/className.contract.test.tsx packages/cortex-native/src/components/atoms
git commit -m "feat(cortex-native): merge consumer className on all atoms via cn"
```

---

## Task 3: className contract for molecules + PieChart

**Files:**
- Modify: `packages/cortex-native/src/className.contract.test.tsx` (add the molecules table)
- Modify: `molecules/HintInputContainer/HintInputContainer.tsx`, `molecules/LabeledSwitch/LabeledSwitch.tsx`, `molecules/IconTextButton/IconTextButton.tsx:90`, `molecules/TextArea/TextArea.tsx`, `molecules/Grid/Grid.tsx`, `molecules/Grid/Item.tsx`, `molecules/Snackbar/Snackbar.tsx:98`, `molecules/PhoneInput/PhoneCountrySelector.tsx`, `molecules/PhoneInput/CountryOption.tsx`, `molecules/PhoneInput/FlagIcon.tsx`, `molecules/Calendar/Calendar.tsx:100`, `molecules/DateTimePicker/DateTimePicker.tsx`, `molecules/DateTimePickerSelector/DateTimePickerSelector.tsx`, `molecules/ScrollableSelector/ScrollableSelector.tsx`, `molecules/ScrollableSelector/components/DateBlock.tsx`, `molecules/SnappingSlider/SnappingSlider.tsx`, `molecules/BottomNavigator/BottomNavigator.tsx`, `molecules/BottomNavigator/Item.tsx`, `molecules/PhoneCountryPickerSelector/PhoneCountryPickerSelector.tsx`, `PieChart/PieChart.tsx`, `PieChart/Dot.tsx`, `PieChart/Label.tsx:50`, `atoms/Input/InputContainer.tsx:95`, `atoms/Input/InputElement.tsx:41`, `atoms/Input/InputMaskElement.tsx:114`, `atoms/Input/PressableInputContainer.tsx`, `atoms/Input/Hint.tsx` — all under `packages/cortex-native/src/components/`

**Interfaces:**
- Consumes: `cn` (Task 1); the `Case` type and `describe.each` harness from Task 2's test file.
- Produces: full `className` coverage for all 54 components — the precondition for Tasks 4-17.

Excluded here, handled as compounds later: `Header` (Task 11), `Select` (Task 14), `Input`/`InputMask`/`InputPassword` (Tasks 8-9), `Tag` root (Task 13), `Card` (Task 7). Their leaf/child files listed above are still swept now.

- [ ] **Step 1: Extend the contract test**

Append to `packages/cortex-native/src/className.contract.test.tsx`, reusing the `Case` type:

```tsx
import BottomNavigator from './components/molecules/BottomNavigator/BottomNavigator';
import BottomNavigatorItem from './components/molecules/BottomNavigator/Item';
import DateBlock from './components/molecules/ScrollableSelector/components/DateBlock';
import Grid from './components/molecules/Grid/Grid';
import GridItem from './components/molecules/Grid/Item';
import HintInputContainer from './components/molecules/HintInputContainer/HintInputContainer';
import IconTextButton from './components/molecules/IconTextButton/IconTextButton';
import InputContainer from './components/atoms/Input/InputContainer';
import InputElement from './components/atoms/Input/InputElement';
import LabeledSwitch from './components/molecules/LabeledSwitch/LabeledSwitch';
import PressableInputContainer from './components/atoms/Input/PressableInputContainer';
import SnappingSlider from './components/molecules/SnappingSlider/SnappingSlider';
import TextArea from './components/molecules/TextArea/TextArea';

const molecules: Case[] = [
  { name: 'Grid', render: p => <Grid {...p} /> },
  { name: 'GridItem', render: p => <GridItem {...p}><Text>t</Text></GridItem> },
  { name: 'InputContainer', render: p => <InputContainer {...p}><Text>t</Text></InputContainer> },
  { name: 'InputElement', render: p => <InputElement {...p} /> },
  { name: 'PressableInputContainer', render: p => <PressableInputContainer {...p}><Text>t</Text></PressableInputContainer> },
  { name: 'HintInputContainer', render: p => <HintInputContainer {...p}><Text>t</Text></HintInputContainer> },
  { name: 'LabeledSwitch', render: p => <LabeledSwitch {...p} active onChange={() => undefined} /> },
  { name: 'IconTextButton', render: p => <IconTextButton {...p} /> },
  { name: 'TextArea', render: p => <TextArea {...p} /> },
  { name: 'SnappingSlider', render: p => <SnappingSlider {...p} /> },
  { name: 'BottomNavigator', render: p => <BottomNavigator {...p} /> },
  { name: 'BottomNavigatorItem', render: p => <BottomNavigatorItem {...p} /> },
  { name: 'DateBlock', render: p => <DateBlock {...p} /> },
];

describe.each(molecules)('$name className contract', ({ render: renderCase, defeats }) => {
  it('forwards the consumer className to its root', () => {
    const { getByTestId } = render(renderCase({ testID: TID, className: 'mt-kilo' }));
    expect(getByTestId(TID).props.className as string).toContain('mt-kilo');
  });

  if (defeats) {
    it(`lets the consumer class defeat ${defeats}`, () => {
      const { getByTestId } = render(renderCase({ testID: TID, className: 'bg-red-500' }));
      const className = getByTestId(TID).props.className as string;
      expect(className).toContain('bg-red-500');
      expect(className).not.toContain(defeats);
    });
  }
});
```

If any component in this table needs required props not shown, read its props interface at the file:line listed in the spec's inventory and supply the minimum — do not add optional props.

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm --filter @tecsinapse/cortex-native test -t 'className contract'`
Expected: FAIL on the new molecule cases; the 17 atom cases from Task 2 still pass.

- [ ] **Step 3: Apply the sweep**

Same three edits as Task 2, Step 3, per file. Two shapes appear here that did not in atoms:

`InputMaskElement.tsx:114` builds a props object rather than JSX — merge inside it:

```tsx
className: cn(inputElementClasses, disabled && inputElementDisabledClasses, className),
```

`PieChart/Label.tsx:50` and `PieChart/Dot.tsx` render `react-native-svg` elements with static class constants — same treatment, `className` last:

```tsx
className={cn(LABEL_TEXT_CLASS, expand && 'flex-1', className)}
```

- [ ] **Step 4: Run the contract test**

Run: `pnpm --filter @tecsinapse/cortex-native test -t 'className contract'`
Expected: PASS, all cases.

- [ ] **Step 5: Verify no `clsx` remains in components**

Run: `pnpm --filter @tecsinapse/cortex-native test`
Expected: full suite PASS. Then confirm the only remaining `clsx` imports under `src/components/` are the five compound files deferred to Tasks 7-14 (`Card/Card.tsx`, `Tag/Tag.tsx`, `Snackbar/Snackbar.tsx`, `Header/Header.tsx`, `Calendar/Calendar.tsx` if not already swept).

- [ ] **Step 6: Commit**

```bash
git add packages/cortex-native/src
git commit -m "feat(cortex-native): merge consumer className on molecules and PieChart"
```

---

## Task 4: Props extend the RN primitive

**Files:**
- Modify: the props interface of every component listed in the table below
- Test: `packages/cortex-native/src/propContract.test.tsx` (create)

**Interfaces:**
- Consumes: nothing new.
- Produces: props interfaces that inherit `style`, `testID`, accessibility props, and event handlers from the RN primitive. Later tasks rely on `ViewProps`/`PressableProps` being present rather than hand-rolled prop lists.

| Base | Components |
|---|---|
| `TextProps` | `Text` (`Text.tsx:14`), `Icon` (`Icon.tsx:50`) |
| `PressableProps` | `Button` (`Button.tsx:16`) |
| `ViewProps` | `Badge` (`Badge.tsx:6`), `Checkbox` (`Checkbox.tsx:6`), `RadioButton` (`RadioButton.tsx:6`), `Switch` (`Switch.tsx:16`), `Avatar` (`Avatar.tsx:8`), `GroupButton` (`GroupButton.tsx:25`), `GroupButtonOption`, `InputContainer` (`InputContainer.tsx:39`), `Snackbar` (`Snackbar.tsx:8`), `Card/Header.tsx:4`, `Card/Footer.tsx:4`, `IconTextButton` (`IconTextButton.tsx:9`), `PhoneCountrySelector`, `CountryOption`, `FlagIcon`, `DateTimePicker` (`DateTimePicker.tsx:7`), `ScrollableSelector` (`ScrollableSelector.tsx:12`), `DateBlock` (`DateBlock.tsx:12`), `PieChart` (`PieChart.tsx:17`) |

`Select` (`types.ts`) and `Header` are covered by Tasks 14 and 11.

- [ ] **Step 1: Write the failing test**

Create `packages/cortex-native/src/propContract.test.tsx`:

```tsx
import React from 'react';
import { render } from '@testing-library/react-native';

import Button from './components/atoms/Button/Button';
import Icon from './components/atoms/Icon/Icon';
import Switch from './components/atoms/Switch/Switch';
import Text from './components/atoms/Text/Text';

describe('props inherited from the RN primitive', () => {
  it('Button forwards PressableProps it never declared', () => {
    const { getByTestId } = render(
      <Button
        testID="b"
        title="t"
        accessibilityLabel="save"
        accessibilityHint="saves the form"
        hitSlop={8}
      />
    );
    const root = getByTestId('b');
    expect(root.props.accessibilityLabel).toBe('save');
    expect(root.props.accessibilityHint).toBe('saves the form');
  });

  it('Text forwards TextProps it never declared', () => {
    const { getByTestId } = render(
      <Text testID="t" selectable allowFontScaling={false}>
        t
      </Text>
    );
    expect(getByTestId('t').props.selectable).toBe(true);
    expect(getByTestId('t').props.allowFontScaling).toBe(false);
  });

  it('Icon forwards TextProps it never declared', () => {
    const { getByTestId } = render(
      <Icon testID="i" name="check" type="ionicon" accessibilityLabel="done" />
    );
    expect(getByTestId('i').props.accessibilityLabel).toBe('done');
  });

  it('Switch forwards ViewProps it never declared', () => {
    const { getByTestId } = render(
      <Switch testID="s" active onChange={() => undefined} accessibilityLabel="toggle" />
    );
    expect(getByTestId('s').props.accessibilityLabel).toBe('toggle');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm --filter @tecsinapse/cortex-native test -t 'props inherited from the RN primitive'`
Expected: FAIL — TypeScript rejects `accessibilityLabel`/`selectable`/`hitSlop` on these components.

- [ ] **Step 3: Change the props bases**

For each component in the table: extend the base, delete any redeclaration of `style` or `testID`, and spread rest onto the primitive. `Button` (`Button.tsx:16-35`) becomes:

```tsx
export interface ButtonProps
  extends PressableProps,
    VariantProps<typeof buttonStyles> {
  /** Convenience label. Ignored when `children` is provided. */
  title?: string;
  loading?: boolean;
}

const Button = ({
  title,
  children,
  disabled = false,
  loading = false,
  intent = 'primary',
  variant = 'filled',
  size = 'default',
  className,
  style,
  ...rest
}: ButtonProps) => { /* body unchanged apart from {...rest} on Pressable */ };
```

Notes that apply across the table:
- `PressableProps` already declares `disabled`, `onPress`, `style`, `testID`, and `children` — remove the hand-rolled versions. `Button`'s `style` stays destructured because it feeds the existing `style={({ pressed }) => [...]}` callback at `Button.tsx:47-51`.
- `ViewProps`/`TextProps` supply `style` and `testID`; delete the ~8 hand-declared `testID?: string` lines.
- Keep every domain prop exactly as it is (`fontColor`, `colorVariant`, `colorTone`, `typography`, `intent`, `size`, …). This task only widens.
- `Text` keeps `numberOfLines`/`ellipsizeMode`/`textTransform` declared even though `TextProps` supplies the first two — they are re-exported in the public `TextProps` type and removing them changes nothing at runtime. Prefer deleting the duplicates only if `build:dts` stays clean.

- [ ] **Step 4: Run the tests**

Run: `pnpm --filter @tecsinapse/cortex-native test`
Expected: PASS, including Tasks 2-3's contract tests.

- [ ] **Step 5: Type-check**

Run: `pnpm --filter @tecsinapse/cortex-native build:dts && pnpm lint:ts`
Expected: clean. Any error here means a domain prop collided with a base prop — resolve by `Omit<>`ing the base member, never by dropping the domain prop.

- [ ] **Step 6: Commit**

```bash
git add packages/cortex-native/src
git commit -m "feat(cortex-native): extend RN primitive props across components"
```

---

## Task 5: Remove `forwardRef`

**Files:**
- Modify: `atoms/Input/Input.tsx:19,96`, `atoms/Input/InputElement.tsx`, `atoms/Input/InputMaskElement.tsx`, `molecules/InputMask/InputMask.tsx`, `molecules/InputPassword/InputPassword.tsx`
- Test: `packages/cortex-native/src/refContract.test.tsx` (create)

**Interfaces:**
- Consumes: Task 4's props bases.
- Produces: `ref` as a declared prop on all five input components. `InputElementProps` gains `ref?: React.Ref<TextInput>`; later tasks pass `ref` through as an ordinary prop.

- [ ] **Step 1: Write the failing test**

Create `packages/cortex-native/src/refContract.test.tsx`:

```tsx
import React from 'react';
import { TextInput } from 'react-native';
import { render } from '@testing-library/react-native';

import Input from './components/atoms/Input/Input';
import InputElement from './components/atoms/Input/InputElement';
import InputMask from './components/molecules/InputMask/InputMask';
import InputPassword from './components/molecules/InputPassword/InputPassword';

describe('ref as a plain prop (React 19)', () => {
  it.each([
    ['Input', (ref: React.Ref<TextInput>) => <Input ref={ref} />],
    ['InputElement', (ref: React.Ref<TextInput>) => <InputElement ref={ref} />],
    ['InputMask', (ref: React.Ref<TextInput>) => <InputMask ref={ref} mask="999" />],
    ['InputPassword', (ref: React.Ref<TextInput>) => <InputPassword ref={ref} />],
  ])('%s attaches its ref to the underlying TextInput', (_name, renderWithRef) => {
    const ref = React.createRef<TextInput>();
    render(renderWithRef(ref));
    expect(ref.current).not.toBeNull();
    expect(typeof ref.current?.focus).toBe('function');
  });
});
```

Check `InputMask`'s required props against `InputMaskNativeProps` (`molecules/InputMask/InputMask.tsx:11`) and adjust the `mask` value to a valid one before running.

- [ ] **Step 2: Run test to verify it passes for the wrong reason**

Run: `pnpm --filter @tecsinapse/cortex-native test -t 'ref as a plain prop'`
Expected: PASS — `forwardRef` already satisfies this. That is intentional: this test is the *invariant* that must survive Step 3, not a RED test. It is what makes the refactor safe.

- [ ] **Step 3: Unwrap the five components**

For each: delete the `React.forwardRef<T, P>(...)` wrapper and the trailing `Component.displayName = '...'` line, declare `ref` in the props interface, and destructure it alongside the other props. `Input.tsx:19-46,96` becomes:

```tsx
export interface InputNativeProps
  extends Omit<InputElementProps, 'style'>,
    InputContainerProps {
  inputFontStack?: 'default' | 'mono';
  inputFontWeight?: 'bold' | 'regular' | 'medium';
  ref?: React.Ref<TextInput>;
  style?: StyleProp<ViewStyle>;
}

const Input = ({ label, /* ...unchanged... */ ref, style, ...rest }: InputNativeProps) => {
  /* body unchanged; `ref` still forwarded to <InputElement ref={ref} /> */
};

export default Input;
```

`displayName` is no longer needed for these — they are plain named function components. Keep `displayName` only on the compound parts introduced in Tasks 7-14, where RTL queries depend on it.

- [ ] **Step 4: Run the tests**

Run: `pnpm --filter @tecsinapse/cortex-native test`
Expected: PASS — the ref test from Step 1 still green, now against unwrapped components.

- [ ] **Step 5: Type-check**

Run: `pnpm --filter @tecsinapse/cortex-native build:dts`
Expected: clean. If `React.ComponentProps<typeof View>`-style inference complains about `ref`, declare `ref?: React.Ref<TextInput>` explicitly as shown — this is the fallback the spec's Risks section anticipates.

- [ ] **Step 6: Commit**

```bash
git add packages/cortex-native/src
git commit -m "refactor(cortex-native): drop forwardRef in favour of React 19 ref prop"
```

---

## Task 6: `Button` accepts `children`

**Files:**
- Modify: `packages/cortex-native/src/components/atoms/Button/Button.tsx:53-63`
- Test: `packages/cortex-native/src/components/atoms/Button/Button.test.tsx`

**Interfaces:**
- Consumes: Task 4's `ButtonProps extends PressableProps`.
- Produces: `Button` renders `children` when present, else `title`. Task 10 builds `Button.Label`/`Button.Icon` on this.

Legacy `react-native-kit` consumers passed children; `title` currently forces a string (`Button.tsx:17`). This makes children the additive path without touching `title`.

- [ ] **Step 1: Write the failing test**

Append to `Button.test.tsx`:

```tsx
it('renders children instead of title when both are provided', () => {
  const { getByText, queryByText } = render(
    <Button title="ignored">
      <Text>composed</Text>
    </Button>
  );
  expect(getByText('composed')).toBeTruthy();
  expect(queryByText('ignored')).toBeNull();
});

it('still renders the title when no children are given', () => {
  const { getByText } = render(<Button title="plain" />);
  expect(getByText('plain')).toBeTruthy();
});

it('renders the spinner instead of children while loading', () => {
  const { queryByText } = render(
    <Button loading>
      <Text>composed</Text>
    </Button>
  );
  expect(queryByText('composed')).toBeNull();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm --filter @tecsinapse/cortex-native test -t 'renders children instead of title'`
Expected: FAIL — `children` is not rendered.

- [ ] **Step 3: Implement**

Replace `Button.tsx:53-63`'s body:

```tsx
{loading ? (
  <ActivityIndicator color={foregroundColor} />
) : (
  children ?? (
    <Text fontWeight="bold" typography="base" style={{ color: foregroundColor }}>
      {title}
    </Text>
  )
)}
```

- [ ] **Step 4: Run tests**

Run: `pnpm --filter @tecsinapse/cortex-native test -t 'Button'`
Expected: PASS, existing Button tests included.

- [ ] **Step 5: Commit**

```bash
git add packages/cortex-native/src/components/atoms/Button
git commit -m "feat(cortex-native): let Button render children alongside title"
```

---

## Task 7: `Card` compound — establishes the pattern

**Files:**
- Create: `packages/cortex-native/src/components/atoms/Card/Body.tsx`
- Modify: `packages/cortex-native/src/components/atoms/Card/Card.tsx`
- Modify: `packages/cortex-native/src/index.ts:27-36`
- Test: `packages/cortex-native/src/components/atoms/Card/Card.test.tsx`

**Interfaces:**
- Consumes: `cn` (Task 1); `Card/Header.tsx`, `Card/Footer.tsx` as swept in Task 2.
- Produces: the `Object.assign` compound idiom that Tasks 8-14 copy verbatim:
  `const Card = Object.assign(CardRoot, { Root: CardRoot, Header, Body, Footer })`, with `Card.Root === Card`. Also produces `CardBody`/`CardBodyProps` exports.

- [ ] **Step 1: Write the failing test**

Append to `Card.test.tsx`:

```tsx
import Card from './Card';

describe('Card compound', () => {
  it('exposes its parts as statics with Root aliasing the callable', () => {
    expect(Card.Root).toBe(Card);
    expect(Card.Header).toBeDefined();
    expect(Card.Body).toBeDefined();
    expect(Card.Footer).toBeDefined();
  });

  it('renders composed parts', () => {
    const { getByText } = render(
      <Card>
        <Card.Header>
          <Text>head</Text>
        </Card.Header>
        <Card.Body>
          <Text>body</Text>
        </Card.Body>
        <Card.Footer>
          <Text>foot</Text>
        </Card.Footer>
      </Card>
    );
    expect(getByText('head')).toBeTruthy();
    expect(getByText('body')).toBeTruthy();
    expect(getByText('foot')).toBeTruthy();
  });

  it('merges the consumer className over the base surface on both branches', () => {
    const passive = render(<Card testID="p" className="bg-red-500" />);
    const passiveClass = passive.getByTestId('p').props.className as string;
    expect(passiveClass).toContain('bg-red-500');
    expect(passiveClass).not.toContain('bg-surface-overlay');

    const active = render(
      <Card testID="a" className="bg-red-500" onPress={() => undefined} />
    );
    const activeClass = active.getByTestId('a').props.className as string;
    expect(activeClass).toContain('bg-red-500');
    expect(activeClass).not.toContain('bg-surface-overlay');
  });

  it('forwards rest props on the non-pressable branch', () => {
    const { getByTestId } = render(<Card testID="c" accessibilityLabel="card" />);
    expect(getByTestId('c').props.accessibilityLabel).toBe('card');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm --filter @tecsinapse/cortex-native test -t 'Card compound'`
Expected: FAIL — `Card.Root`/`Card.Body` undefined; className assertions fail because `Card.tsx:28` shadows the prop; rest-prop assertion fails because `Card.tsx:52-56` drops `...rest`.

- [ ] **Step 3: Create `Card/Body.tsx`**

```tsx
import React from 'react';
import { View, ViewProps } from 'react-native';
import { cn } from '@tecsinapse/cortex-core';

export interface BodyProps extends ViewProps {}

const Body = ({ children, className, ...rest }: BodyProps): React.ReactElement => (
  <View {...rest} className={cn('p-centi', className)}>
    {children}
  </View>
);

Body.displayName = 'Card.Body';

export default Body;
```

- [ ] **Step 4: Rewrite `Card.tsx`**

Rename the inner component to `CardRoot`, stop shadowing `className`, spread `...rest` on both branches, and assemble the compound. Leave the `surfaceColor` behaviour exactly as-is — Task 16 changes it, gated behind Task 15's regression tests.

```tsx
import React, { ReactNode } from 'react';
import { GestureResponderEvent, StyleProp, ViewStyle } from 'react-native';
import { cn } from '@tecsinapse/cortex-core';
import { useCSSVariable } from 'uniwind';

import Paper, { PaperProps } from '../Paper/Paper';
import PressableSurface, { PressableSurfaceProps } from '../PressableSurface/PressableSurface';
import Body from './Body';
import Footer from './Footer';
import Header from './Header';

export interface CardProps extends PaperProps, Omit<PressableSurfaceProps, 'style'> {
  /** Click handler */
  onPress?: null | ((event: GestureResponderEvent) => void);
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const cardBaseClass = 'bg-surface-overlay rounded-mili';

const CardRoot = ({
  children,
  elevated = false,
  onPress,
  className,
  style,
  ...rest
}: CardProps): React.ReactElement => {
  const composed = cn(cardBaseClass, elevated && 'shadow-default', className);
  const surfaceColor = useCSSVariable('--color-surface-overlay') as string | undefined;

  if (onPress) {
    return (
      <PressableSurface
        {...rest}
        style={style}
        onPress={onPress}
        className={composed}
        surfaceColor={surfaceColor}
      >
        {children}
      </PressableSurface>
    );
  }

  return (
    <Paper {...rest} className={composed} style={style} elevated={elevated}>
      {children}
    </Paper>
  );
};

CardRoot.displayName = 'Card';

const Card = Object.assign(CardRoot, {
  Root: CardRoot,
  Header,
  Body,
  Footer,
});

export default Card;
export { default as Header } from './Header';
export { default as Body } from './Body';
export { default as Footer } from './Footer';
export type { HeaderProps } from './Header';
export type { BodyProps } from './Body';
export type { FooterProps } from './Footer';
```

Note `Paper` now receives `className={composed}`, and `Paper` itself merges it with its own base (`Paper.tsx:18`) — `cn` is idempotent on already-merged strings, so the duplicated `bg-surface-overlay`/`rounded-mili` collapses correctly.

- [ ] **Step 5: Export `CardBody` from the barrel**

In `packages/cortex-native/src/index.ts:27-36`, add `Body as CardBody` to the value export and `BodyProps as CardBodyProps` to the type export, keeping the existing `CardHeader`/`CardFooter` names untouched.

- [ ] **Step 6: Run tests**

Run: `pnpm --filter @tecsinapse/cortex-native test -t 'Card'`
Expected: PASS, all Card tests including the pre-existing ones.

- [ ] **Step 7: Commit**

```bash
git add packages/cortex-native/src/components/atoms/Card packages/cortex-native/src/index.ts
git commit -m "feat(cortex-native): add Card compound parts with Root static"
```

---

## Task 8: `Input` parts + context

**Files:**
- Create: `atoms/Input/InputContext.tsx`, `atoms/Input/Label.tsx`, `atoms/Input/Left.tsx`, `atoms/Input/Right.tsx`
- Modify: `atoms/Input/Input.tsx`, `atoms/Input/InputContainer.tsx`, `packages/cortex-native/src/index.ts:56-70`
- Test: `packages/cortex-native/src/components/atoms/Input/Input.test.tsx` (create if absent)

**Interfaces:**
- Consumes: `cn` (Task 1); `useInputFocus` (`atoms/Input/useInputFocus.ts`); the `Object.assign` idiom from Task 7.
- Produces:
  - `InputContext` with value `{ focused: boolean; disabled?: boolean; variant: InputVariantType }`, and `useInputContext(): InputContextValue` which throws `'Input parts must be used within <Input.Root>'` outside a root.
  - `Input.Root === Input`, plus `Input.Face` (= `InputContainer`), `Input.Box` (= `InputElement`), `Input.Label`, `Input.Hint` (= `Hint`), `Input.Left`, `Input.Right`.
  - Barrel exports `InputLabel`/`InputLeft`/`InputRight` with their prop types.
  - Task 9 consumes all of these.

- [ ] **Step 1: Write the failing test**

```tsx
import React from 'react';
import { render } from '@testing-library/react-native';

import Input from './Input';
import Text from '../Text/Text';

describe('Input compound', () => {
  it('exposes its parts with Root aliasing the callable', () => {
    expect(Input.Root).toBe(Input);
    ['Face', 'Box', 'Label', 'Hint', 'Left', 'Right'].forEach(part => {
      expect(Input[part as 'Face']).toBeDefined();
    });
  });

  it('renders a composed input', () => {
    const { getByTestId, getByText } = render(
      <Input.Face testID="face">
        <Input.Left>
          <Text>R$</Text>
        </Input.Left>
        <Input.Box testID="box" value="10" />
        <Input.Right>
          <Text>kg</Text>
        </Input.Right>
      </Input.Face>
    );
    expect(getByTestId('face')).toBeTruthy();
    expect(getByTestId('box').props.value).toBe('10');
    expect(getByText('R$')).toBeTruthy();
    expect(getByText('kg')).toBeTruthy();
  });

  it('throws when a part is used outside a root that provides context', () => {
    expect(() => render(<Input.Label>label</Input.Label>)).toThrow(
      /must be used within/
    );
  });

  it('keeps the monolith API working', () => {
    const { getByText, getByDisplayValue } = render(
      <Input label="Name" hint="required" value="Ada" />
    );
    expect(getByDisplayValue('Ada')).toBeTruthy();
    expect(getByText('required')).toBeTruthy();
  });

  it('still honours the legacy leftComponent/rightComponent injection', () => {
    const { getByText } = render(
      <Input
        value="x"
        leftComponent={<Text>left-legacy</Text>}
        rightComponent={<Text>right-legacy</Text>}
      />
    );
    expect(getByText('left-legacy')).toBeTruthy();
    expect(getByText('right-legacy')).toBeTruthy();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm --filter @tecsinapse/cortex-native test -t 'Input compound'`
Expected: FAIL — `Input.Root`, `Input.Face`, `Input.Label` are undefined.

- [ ] **Step 3: Create the context**

`atoms/Input/InputContext.tsx`:

```tsx
import { createContext, useContext } from 'react';

import type { InputVariantType } from './InputContainer';

export type InputContextValue = {
  focused: boolean;
  disabled?: boolean;
  variant: InputVariantType;
};

export const InputContext = createContext<InputContextValue | null>(null);

export const useInputContext = (): InputContextValue => {
  const context = useContext(InputContext);
  if (!context) {
    throw new Error('Input parts must be used within <Input.Root> or <Input.Face>');
  }
  return context;
};
```

- [ ] **Step 4: Create `Label`, `Left`, `Right`**

`atoms/Input/Label.tsx` — owns what `InputContainer`'s `LabelComponent` injection did (`InputContainer.tsx:77`):

```tsx
import React from 'react';
import { cn } from '@tecsinapse/cortex-core';

import Text, { TextProps } from '../Text/Text';
import { useInputContext } from './InputContext';

export interface LabelProps extends TextProps {}

const Label = ({ children, className, ...rest }: LabelProps): React.ReactElement => {
  const { disabled } = useInputContext();
  return (
    <Text
      fontColor="medium"
      typography="label"
      fontWeight="bold"
      {...rest}
      className={cn(disabled && 'opacity-50', className)}
    >
      {children}
    </Text>
  );
};

Label.displayName = 'Input.Label';

export default Label;
```

`atoms/Input/Left.tsx` (and `Right.tsx`, identical but `'Input.Right'` / `ml-mili`):

```tsx
import React from 'react';
import { View, ViewProps } from 'react-native';
import { cn } from '@tecsinapse/cortex-core';

export interface LeftProps extends ViewProps {}

const Left = ({ children, className, ...rest }: LeftProps): React.ReactElement => (
  <View {...rest} className={cn('mr-mili justify-center', className)}>
    {children}
  </View>
);

Left.displayName = 'Input.Left';

export default Left;
```

- [ ] **Step 5: Provide context from `InputContainer` (`Input.Face`)**

Wrap `InputContainer`'s returned tree in `InputContext.Provider` with `{ focused: !!focused, disabled, variant }`. Keep its existing `label`/`LabelComponent`/`leftComponent`/`rightComponent` props and behaviour untouched — legacy consumers depend on them.

- [ ] **Step 6: Assemble the compound in `Input.tsx`**

Rename the component to `InputRoot`, then:

```tsx
const Input = Object.assign(InputRoot, {
  Root: InputRoot,
  Face: InputContainer,
  Box: InputElement,
  Label,
  Hint,
  Left,
  Right,
});

export default Input;
```

Also drop the `LabelComponent={Text}` injection at `Input.tsx:70` — `Input.Label` owns that now, and `InputContainer`'s own default (`InputContainer.tsx:77`) already resolves to `Text`.

- [ ] **Step 7: Export the new parts from the barrel**

In `packages/cortex-native/src/index.ts` near lines 56-70, add `InputLabel`, `InputLeft`, `InputRight` value exports and their prop types, alongside the existing `InputContainer`/`InputElement`/`Hint` exports (which stay as documented aliases of `Input.Face`/`Input.Box`/`Input.Hint`).

- [ ] **Step 8: Run tests**

Run: `pnpm --filter @tecsinapse/cortex-native test`
Expected: PASS — new compound tests plus every pre-existing Input/InputMask/InputPassword/TextArea/PhoneInput test.

- [ ] **Step 9: Commit**

```bash
git add packages/cortex-native/src/components/atoms/Input packages/cortex-native/src/index.ts
git commit -m "feat(cortex-native): add Input compound parts and context"
```

---

## Task 9: Input-family monoliths reuse the shared parts

**Files:**
- Modify: `molecules/InputMask/InputMask.tsx`, `molecules/InputPassword/InputPassword.tsx`, `molecules/TextArea/TextArea.tsx`, `molecules/PhoneInput/PhoneInput.tsx`, `molecules/HintInputContainer/HintInputContainer.tsx`
- Test: co-located `*.test.tsx` for each

**Interfaces:**
- Consumes: `Input.Face`, `Input.Box`, `Input.Label`, `Input.Hint`, `Input.Left`, `Input.Right`, `useInputContext` (Task 8).
- Produces: no new public API. Guarantees one implementation of the input chrome across five components.

- [ ] **Step 1: Write the failing test**

Create `packages/cortex-native/src/inputFamily.parity.test.tsx`:

```tsx
import React from 'react';
import { render } from '@testing-library/react-native';

import Input from './components/atoms/Input/Input';
import InputMask from './components/molecules/InputMask/InputMask';
import InputPassword from './components/molecules/InputPassword/InputPassword';
import TextArea from './components/molecules/TextArea/TextArea';

const chrome = (node: React.ReactElement) => {
  const { getByTestId } = render(node);
  return getByTestId('face').props.className as string;
};

describe('input family shares one chrome implementation', () => {
  it('renders the same container classes as Input for the same variant', () => {
    const base = chrome(<Input inputContainerTestID="face" variant="error" value="x" />);
    expect(chrome(<InputMask inputContainerTestID="face" variant="error" mask="999" value="1" />)).toBe(base);
    expect(chrome(<InputPassword inputContainerTestID="face" variant="error" value="x" />)).toBe(base);
    expect(chrome(<TextArea inputContainerTestID="face" variant="error" value="x" />)).toBe(base);
  });
});
```

`InputContainerProps` has no `inputContainerTestID` today. Add it in Step 3 as an optional prop threaded to `Input.Face`'s `testID` — it is additive, and it is what makes the chrome addressable from tests without relying on tree shape.

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm --filter @tecsinapse/cortex-native test -t 'input family shares one chrome'`
Expected: FAIL — `inputContainerTestID` is not a prop.

- [ ] **Step 3: Thread `inputContainerTestID` and swap private imports for parts**

Add `inputContainerTestID?: string` to `InputContainerProps` (`InputContainer.tsx:39-61`) and set it as the container `View`'s `testID`. Then in each of the five files, replace direct imports of `InputContainer`/`InputElement`/`Hint` with the `Input.Face`/`Input.Box`/`Input.Hint` statics, changing nothing else about their prop handling.

- [ ] **Step 4: Run tests**

Run: `pnpm --filter @tecsinapse/cortex-native test`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add packages/cortex-native/src
git commit -m "refactor(cortex-native): rebuild input-family monoliths on shared Input parts"
```

---

## Task 10: `Button` compound

**Files:**
- Create: `atoms/Button/ButtonContext.tsx`, `atoms/Button/Label.tsx`, `atoms/Button/Icon.tsx`
- Modify: `atoms/Button/Button.tsx`, `packages/cortex-native/src/index.ts:3-4`
- Test: `atoms/Button/Button.test.tsx`

**Interfaces:**
- Consumes: `getButtonForegroundColorVar` (`styles/button.ts:60`); `useCSSVariable` from `uniwind`; Task 6's `children` support.
- Produces: `ButtonContext` with `{ foregroundColor?: string }`, `useButtonContext()`, `Button.Root === Button`, `Button.Label`, `Button.Icon`, and barrel exports `ButtonLabel`/`ButtonIcon`.

- [ ] **Step 1: Write the failing test**

```tsx
describe('Button compound', () => {
  it('exposes parts with Root aliasing the callable', () => {
    expect(Button.Root).toBe(Button);
    expect(Button.Label).toBeDefined();
    expect(Button.Icon).toBeDefined();
  });

  it('tints composed parts with the resolved foreground colour', () => {
    const { getByTestId, getByText } = render(
      <Button intent="primary" variant="filled">
        <Button.Icon testID="icon" name="check" type="ionicon" />
        <Button.Label>save</Button.Label>
      </Button>
    );
    expect(getByText('save')).toBeTruthy();
    expect(getByTestId('icon')).toBeTruthy();
  });

  it('throws when a part is used outside a Button', () => {
    expect(() => render(<Button.Label>x</Button.Label>)).toThrow(/must be used within/);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm --filter @tecsinapse/cortex-native test -t 'Button compound'`
Expected: FAIL — statics undefined.

- [ ] **Step 3: Create the context**

`atoms/Button/ButtonContext.tsx`:

```tsx
import { createContext, useContext } from 'react';

export type ButtonContextValue = { foregroundColor?: string };

export const ButtonContext = createContext<ButtonContextValue | null>(null);

export const useButtonContext = (): ButtonContextValue => {
  const context = useContext(ButtonContext);
  if (!context) {
    throw new Error('Button parts must be used within <Button.Root>');
  }
  return context;
};
```

- [ ] **Step 4: Create the parts**

`atoms/Button/Label.tsx`:

```tsx
import React from 'react';

import Text, { TextProps } from '../Text/Text';
import { useButtonContext } from './ButtonContext';

export interface LabelProps extends TextProps {}

const Label = ({ children, style, ...rest }: LabelProps): React.ReactElement => {
  const { foregroundColor } = useButtonContext();
  return (
    <Text fontWeight="bold" typography="base" {...rest} style={[{ color: foregroundColor }, style]}>
      {children}
    </Text>
  );
};

Label.displayName = 'Button.Label';

export default Label;
```

`atoms/Button/Icon.tsx` — same shape, wrapping `../Icon/Icon` with `IconProps`, applying `style={[{ color: foregroundColor }, style]}`, `displayName = 'Button.Icon'`.

- [ ] **Step 5: Wrap the root and assemble**

In `Button.tsx`, wrap the `Pressable`'s children in `ButtonContext.Provider value={{ foregroundColor }}` (reusing the `foregroundColor` already computed at `Button.tsx:36-38`), rename the component to `ButtonRoot`, and assemble:

```tsx
const Button = Object.assign(ButtonRoot, { Root: ButtonRoot, Label, Icon });
```

The `title` fallback keeps using the inline `style={{ color: foregroundColor }}` it has today; composed children get the colour from context.

- [ ] **Step 6: Run tests, export, commit**

Run: `pnpm --filter @tecsinapse/cortex-native test -t 'Button'` → PASS. Add `ButtonLabel`/`ButtonIcon` (+ prop types) to `index.ts` near lines 3-4.

```bash
git add packages/cortex-native/src/components/atoms/Button packages/cortex-native/src/index.ts
git commit -m "feat(cortex-native): add Button compound parts"
```

---

## Task 11: `Header` compound

**Files:**
- Create: `molecules/Header/Left.tsx`, `molecules/Header/Title.tsx`, `molecules/Header/Right.tsx`
- Modify: `molecules/Header/Header.tsx`, `molecules/Header/index.ts`, `packages/cortex-native/src/index.ts:205-209`
- Test: `molecules/Header/Header.test.tsx` (create if absent)

**Interfaces:**
- Consumes: `cn`; `Attachable` (`Header.tsx:7`); the existing private `FloatingButton` (`Header.tsx:22`).
- Produces: `Header.Root === Header`, `Header.Left`, `Header.Title`, `Header.Right`; barrel exports `HeaderLeft`/`HeaderTitle`/`HeaderRight`. `Header.Left`/`Header.Right` accept an optional `button?: Attachable` so the monolith can delegate to them.

- [ ] **Step 1: Write the failing test**

```tsx
describe('Header compound', () => {
  it('exposes parts with Root aliasing the callable', () => {
    expect(Header.Root).toBe(Header);
    ['Left', 'Title', 'Right'].forEach(p => expect(Header[p as 'Left']).toBeDefined());
  });

  it('renders composed slots', () => {
    const { getByText } = render(
      <Header>
        <Header.Left><Text>L</Text></Header.Left>
        <Header.Title><Text>T</Text></Header.Title>
        <Header.Right><Text>R</Text></Header.Right>
      </Header>
    );
    ['L', 'T', 'R'].forEach(t => expect(getByText(t)).toBeTruthy());
  });

  it('merges the consumer className instead of discarding it', () => {
    const { getByTestId } = render(<Header testID="h" className="px-nano" />);
    expect(getByTestId('h').props.className as string).toContain('px-nano');
  });

  it('still renders legacy leftButton/rightButton with their badges', () => {
    const { getByText } = render(
      <Header
        leftButton={{ icon: { name: 'menu', type: 'ionicon' }, valueBadge: 3 }}
        rightButton={{ icon: { name: 'close', type: 'ionicon' } }}
      >
        <Text>title</Text>
      </Header>
    );
    expect(getByText('3')).toBeTruthy();
    expect(getByText('title')).toBeTruthy();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm --filter @tecsinapse/cortex-native test -t 'Header compound'`
Expected: FAIL — statics undefined, and the className assertion fails because `Header.tsx:59` overwrites it.

- [ ] **Step 3: Create the parts**

`molecules/Header/Left.tsx` (mirror for `Right.tsx` with `displayName = 'Header.Right'`):

```tsx
import React from 'react';
import { View, ViewProps } from 'react-native';
import { cn } from '@tecsinapse/cortex-core';

import Badge from '../../atoms/Badge/Badge';
import { FloatingButton, type Attachable } from './Header';

export interface HeaderSlotProps extends ViewProps {
  /** Legacy Attachable shorthand. Ignored when children are provided. */
  button?: Attachable;
}

const Left = ({ button, children, className, ...rest }: HeaderSlotProps): React.ReactElement => (
  <View {...rest} className={cn('justify-center', className)}>
    {children ??
      (button ? (
        button.valueBadge ? (
          <Badge value={button.valueBadge} color="error">
            <FloatingButton {...button} />
          </Badge>
        ) : (
          <FloatingButton {...button} />
        )
      ) : null)}
  </View>
);

Left.displayName = 'Header.Left';

export default Left;
```

This requires exporting `FloatingButton` and `Attachable` from `Header.tsx` (`Attachable` is already exported at line 7; add `export` to `FloatingButton` at line 22). To avoid the circular import, move `FloatingButton`, `DummyButton`, and `Attachable` into a new `molecules/Header/FloatingButton.tsx` and have `Header.tsx`, `Left.tsx`, and `Right.tsx` all import from there. Re-export `Attachable` from `Header.tsx` so the existing public type path is preserved.

`molecules/Header/Title.tsx`:

```tsx
import React from 'react';
import { View, ViewProps } from 'react-native';
import { cn } from '@tecsinapse/cortex-core';

export interface TitleProps extends ViewProps {}

const Title = ({ children, className, ...rest }: TitleProps): React.ReactElement => (
  <View {...rest} className={cn('flex-1 items-center justify-center', className)}>
    {children}
  </View>
);

Title.displayName = 'Header.Title';

export default Title;
```

- [ ] **Step 4: Rebuild the monolith on the parts**

`HeaderRoot` renders `<Header.Left button={leftButton} />`, `children`, `<Header.Right button={rightButton} />`, keeps the `DummyButton` spacer when a button is absent, merges `className` via `cn`, and assembles:

```tsx
const Header = Object.assign(HeaderRoot, { Root: HeaderRoot, Left, Title, Right });
```

- [ ] **Step 5: Run tests, export, commit**

Run: `pnpm --filter @tecsinapse/cortex-native test -t 'Header'` → PASS. Add `HeaderLeft`/`HeaderTitle`/`HeaderRight` + prop types to `index.ts` near lines 205-209.

```bash
git add packages/cortex-native/src/components/molecules/Header packages/cortex-native/src/index.ts
git commit -m "feat(cortex-native): add Header compound parts"
```

---

## Task 12: `Snackbar` compound

**Files:**
- Create: `molecules/Snackbar/SnackbarContext.tsx`, `molecules/Snackbar/SnackbarIcon.tsx`, `molecules/Snackbar/Content.tsx`, `molecules/Snackbar/Action.tsx`
- Modify: `molecules/Snackbar/Snackbar.tsx:96-138`, `packages/cortex-native/src/index.ts:135-136`
- Test: `molecules/Snackbar/Snackbar.test.tsx`

**Interfaces:**
- Consumes: `cn`; `colorToneBg` (`styles/colors.ts`); `Icon`/`IconProps`.
- Produces: `SnackbarContext` with `{ colorVariant: ColorType; colorTone: ColorGradationType; onDismiss: () => void }`, `useSnackbarContext()`, `Snackbar.Root === Snackbar`, `Snackbar.Icon`, `Snackbar.Content`, `Snackbar.Action`; barrel exports `SnackbarIcon`/`SnackbarContent`/`SnackbarAction`.

- [ ] **Step 1: Write the failing test**

```tsx
describe('Snackbar compound', () => {
  it('exposes parts with Root aliasing the callable', () => {
    expect(Snackbar.Root).toBe(Snackbar);
    ['Icon', 'Content', 'Action'].forEach(p => expect(Snackbar[p as 'Icon']).toBeDefined());
  });

  it('renders composed parts and fires the action', () => {
    const onClose = jest.fn();
    const { getByText, getByRole } = render(
      <Snackbar open onClose={onClose}>
        <Snackbar.Icon name="check" type="ionicon" />
        <Snackbar.Content><Text>saved</Text></Snackbar.Content>
        <Snackbar.Action />
      </Snackbar>
    );
    expect(getByText('saved')).toBeTruthy();
    fireEvent.press(getByRole('button'));
    expect(onClose).toHaveBeenCalled();
  });

  it('still renders the legacy leftIcon and dismissable affordance', () => {
    const { getByRole } = render(
      <Snackbar open dismissable leftIcon={{ name: 'info', type: 'ionicon' }}>
        <Text>legacy</Text>
      </Snackbar>
    );
    expect(getByRole('button')).toBeTruthy();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm --filter @tecsinapse/cortex-native test -t 'Snackbar compound'`
Expected: FAIL — statics undefined.

- [ ] **Step 3: Extract the parts from `Snackbar.tsx:114-137`**

- `Content.tsx` ← the `<View className="flex-row items-center flex-shrink">` wrapper at line 115 plus the `flex-shrink` child at line 121.
- `SnackbarIcon.tsx` ← lines 116-120, taking `IconProps`, defaulting `size="centi"`, wrapped in `mr-mili`.
- `Action.tsx` ← lines 123-136, taking `Omit<IconProps, 'name' | 'type'>` with `name="close"`/`type="material-community"` defaults, `accessibilityRole="button"`, `onPress` defaulting to context's `onDismiss`.

Each part reads `colorVariant`/`colorTone` from context for its tint and appends `className` last via `cn`.

- [ ] **Step 4: Provide context and assemble**

Wrap the `Animated.View` body in `SnackbarContext.Provider`, render the legacy `leftIcon`/`dismissable` path through the new parts, then `Object.assign(SnackbarRoot, { Root: SnackbarRoot, Icon: SnackbarIcon, Content, Action })`.

- [ ] **Step 5: Run tests, export, commit**

Run: `pnpm --filter @tecsinapse/cortex-native test -t 'Snackbar'` → PASS.

```bash
git add packages/cortex-native/src/components/molecules/Snackbar packages/cortex-native/src/index.ts
git commit -m "feat(cortex-native): add Snackbar compound parts"
```

---

## Task 13: `Tag` compound

**Files:**
- Create: `atoms/Tag/TagContext.tsx`, `atoms/Tag/TagIcon.tsx`, `atoms/Tag/Label.tsx`, `atoms/Tag/Close.tsx`
- Modify: `atoms/Tag/Tag.tsx:53-92`, `packages/cortex-native/src/index.ts:13-14`
- Test: `atoms/Tag/Tag.test.tsx`

**Interfaces:**
- Consumes: `cn`; `colorToneBg`; `Icon`/`IconProps`.
- Produces: `TagContext` with `{ handleDismiss: () => void }`, `useTagContext()`, `Tag.Root === Tag`, `Tag.Icon`, `Tag.Label`, `Tag.Close`; barrel exports `TagIcon`/`TagLabel`/`TagClose`. Mirrors web's `Tag = { Root, Close, Label }`.

- [ ] **Step 1: Write the failing test**

```tsx
describe('Tag compound', () => {
  it('exposes parts with Root aliasing the callable', () => {
    expect(Tag.Root).toBe(Tag);
    ['Icon', 'Label', 'Close'].forEach(p => expect(Tag[p as 'Icon']).toBeDefined());
  });

  it('renders composed parts and dismisses through context', () => {
    const onDismiss = jest.fn();
    const { getByText, getByRole } = render(
      <Tag onDismiss={onDismiss}>
        <Tag.Icon name="star" type="ionicon" />
        <Tag.Label>composed</Tag.Label>
        <Tag.Close />
      </Tag>
    );
    expect(getByText('composed')).toBeTruthy();
    fireEvent.press(getByRole('button'));
    expect(onDismiss).toHaveBeenCalled();
  });

  it('still supports the legacy value and icon props', () => {
    const { getByText } = render(<Tag value="legacy" icon={{ name: 'star', type: 'ionicon' }} />);
    expect(getByText('legacy')).toBeTruthy();
  });
});
```

`TagProps.value` is currently required (`Tag.tsx:10`); make it optional in Step 3 so composed usage compiles. Optional-ising a required prop is additive — no existing call site breaks.

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm --filter @tecsinapse/cortex-native test -t 'Tag compound'`
Expected: FAIL — statics undefined and `value` is required.

- [ ] **Step 3: Extract parts, make `value` optional, assemble**

- `TagIcon.tsx` ← `Tag.tsx:66-74`, defaults `size="micro"`, `colorVariant="primary"`, wrapper `mr-micro`.
- `Label.tsx` ← `Tag.tsx:75`'s string branch, rendering `Text`.
- `Close.tsx` ← `Tag.tsx:76-90`, `accessibilityRole="button"`, `hitSlop={8}`, `className={cn('ml-[2px]', className)}` (this also lands the spec's §4 `marginLeft: 2` purge), `onPress` from context.
- Root renders `children ?? <legacy icon/value/close path built from the same parts>`, keeps the `Animated` opacity inline style, and assembles with `Object.assign`.

- [ ] **Step 4: Run tests, export, commit**

Run: `pnpm --filter @tecsinapse/cortex-native test -t 'Tag'` → PASS.

```bash
git add packages/cortex-native/src/components/atoms/Tag packages/cortex-native/src/index.ts
git commit -m "feat(cortex-native): add Tag compound parts"
```

---

## Task 14: `Select` compound

**Files:**
- Create: `molecules/Select/SelectContext.tsx`, `molecules/Select/parts/Trigger.tsx`, `parts/Sheet.tsx`, `parts/Search.tsx`, `parts/Options.tsx`, `parts/Confirm.tsx`
- Modify: `molecules/Select/Select.tsx`, `molecules/Select/components/Modal.tsx`, `molecules/Select/index.ts`, `packages/cortex-native/src/index.ts:150-166`
- Test: `molecules/Select/Select.test.tsx`

**Interfaces:**
- Consumes: `useSelect` (`Select/hooks/useSelect.ts`), `useModal` (`Select/hooks/useModal.tsx`), `Flat`/`Section` (`Select/components/`), `HintInputContainer`, `Input.Face` (Task 8).
- Produces: `SelectContext` with `{ type, value, keyExtractor, labelExtractor, onSelect, close, closeOnPick }`, `useSelectContext()`, `Select.Root === Select`, `Select.Trigger`, `Select.Sheet`, `Select.Search`, `Select.Options`, `Select.Confirm`; barrel exports `SelectTrigger`/`SelectSheet`/`SelectSearch`/`SelectOptions`/`SelectConfirm`.

Sequenced last: `Select`'s state lives in two hooks and `SelectModal` is one 105-line component. Named `Sheet`, not web's `Popover`, because native renders a bottom-sheet `Modal` (`Select.tsx:110-136`).

- [ ] **Step 1: Write the failing test**

```tsx
describe('Select compound', () => {
  it('exposes parts with Root aliasing the callable', () => {
    expect(Select.Root).toBe(Select);
    ['Trigger', 'Sheet', 'Search', 'Options', 'Confirm'].forEach(p =>
      expect(Select[p as 'Trigger']).toBeDefined()
    );
  });

  it('opens the sheet from a composed trigger and selects an option', () => {
    const onSelect = jest.fn();
    const { getByText, getByTestId } = render(
      <Select
        type="single"
        selectOptions={[{ id: 1, name: 'one' }]}
        keyExtractor={o => String(o.id)}
        labelExtractor={o => o.name}
        onSelect={onSelect}
      />
    );
    fireEvent.press(getByTestId('select-trigger'));
    expect(getByTestId('select-sheet')).toBeTruthy();
    fireEvent.press(getByText('one'));
    expect(onSelect).toHaveBeenCalled();
  });

  it('still honours the legacy controlComponent render prop', () => {
    const { getByText } = render(
      <Select
        type="single"
        selectOptions={[]}
        keyExtractor={() => '1'}
        labelExtractor={() => 'x'}
        onSelect={() => undefined}
        controlComponent={(onPress, display) => <Text onPress={onPress}>custom {display}</Text>}
      />
    );
    expect(getByText(/custom/)).toBeTruthy();
  });
});
```

Verify the required props against `SelectNativeProps` (`molecules/Select/types.ts`) before running and adjust the fixture to match — do not add props the type does not declare.

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm --filter @tecsinapse/cortex-native test -t 'Select compound'`
Expected: FAIL — statics undefined; `select-trigger` testID does not exist (`select-sheet` already does, `Select.tsx:122`).

- [ ] **Step 3: Extract `Trigger`**

`parts/Trigger.tsx` ← `Select.tsx:86-107`'s `HintInputContainer` branch, with `testID` defaulting to `'select-trigger'`, reading `value`/`labelExtractor` from context for its display value, and `className` merged last.

- [ ] **Step 4: Extract `Sheet`**

`parts/Sheet.tsx` ← `Select.tsx:110-136`: the RN `Modal`, the backdrop `Pressable` (`testID="select-backdrop"`), the sheet `View` (`testID="select-sheet"`), and the stop-propagation `Pressable`. Static styling moves to classes (`flex-1 bg-black/50`, `flex-1 justify-end`, `h-[88%]`, `bg-surface-overlay rounded-t-deca flex-1`), landing part of §4's purge; the keyboard/`bottomInset` padding stays inline because it is computed.

- [ ] **Step 5: Split `SelectModal` into `Search`, `Options`, `Confirm`**

From `components/Modal.tsx`: lines 39-56 → the sheet's title row (absorbed by `Sheet`), 58-69 → `parts/Search.tsx`, 73-90 → `parts/Options.tsx` (keeps delegating to `Flat`/`Section`), 92-102 → `parts/Confirm.tsx`. `SelectModal` remains exported and is rebuilt from these parts so nothing that imports it changes.

- [ ] **Step 6: Provide context and assemble**

`SelectRoot` wraps its output in `SelectContext.Provider` fed from `useSelect(props)`, renders `Select.Trigger` (or `controlComponent` when given) plus `Select.Sheet`, and assembles:

```tsx
const Select = Object.assign(SelectRoot, {
  Root: SelectRoot, Trigger, Sheet, Search, Options, Confirm,
});
```

`Select` is generic (`<Data, Type extends SelectType>`); `Object.assign` on a generic function preserves the call signature, but verify with `build:dts` that `SelectNativeProps` inference still works at call sites.

- [ ] **Step 7: Run tests and type-check**

Run: `pnpm --filter @tecsinapse/cortex-native test && pnpm --filter @tecsinapse/cortex-native build:dts`
Expected: PASS and clean emit.

- [ ] **Step 8: Commit**

```bash
git add packages/cortex-native/src/components/molecules/Select packages/cortex-native/src/index.ts
git commit -m "feat(cortex-native): add Select compound parts"
```

---

## Task 15: Background regression tests (gate for Task 16)

**Files:**
- Test: `molecules/Calendar/Calendar.test.tsx` (extend), create `atoms/PressableSurface/PressableSurface.test.tsx`

**Interfaces:**
- Consumes: `Calendar`, `MonthWeek` (`Calendar/components/MonthWeek.tsx`), `SelectYear` (`Calendar/components/SelectYear.tsx`), `PressableSurface`.
- Produces: executable proof of the invariant `PressableSurface.tsx:35-41` documents in prose. Task 16 must not break these.

- [ ] **Step 1: Write the tests**

Create `atoms/PressableSurface/PressableSurface.test.tsx`:

```tsx
import React from 'react';
import { render } from '@testing-library/react-native';
import { StyleSheet } from 'react-native';

import PressableSurface from './PressableSurface';

const flatten = (style: unknown) => StyleSheet.flatten(style as never) ?? {};

describe('PressableSurface background invariant', () => {
  it('emits no inline backgroundColor when surfaceColor is omitted', () => {
    const { getByTestId } = render(
      <PressableSurface testID="p" className="bg-primary-light" />
    );
    const style = getByTestId('p').props.style;
    const resolved = typeof style === 'function' ? style({ pressed: false }) : style;
    expect(flatten(resolved).backgroundColor).toBeUndefined();
  });

  it('emits an inline backgroundColor when surfaceColor is provided', () => {
    const { getByTestId } = render(
      <PressableSurface testID="p" surfaceColor="#123456" />
    );
    const style = getByTestId('p').props.style;
    const resolved = typeof style === 'function' ? style({ pressed: false }) : style;
    expect(flatten(resolved).backgroundColor).toBe('#123456');
  });
});
```

Then add to `Calendar.test.tsx` assertions that a Calendar day cell, a `MonthWeek` in-range cell, and a selected `SelectYear` card each keep their `bg-*` class in `props.className` and carry no inline `backgroundColor`. Read the three component files for the exact class names rather than guessing.

- [ ] **Step 2: Run to verify they pass on today's code**

Run: `pnpm --filter @tecsinapse/cortex-native test -t 'background'`
Expected: PASS. These are invariants captured *before* the change, not RED tests. If any fails now, stop — the current behaviour differs from what `PressableSurface.tsx:35-41` claims, and Task 16 needs redesign.

- [ ] **Step 3: Commit**

```bash
git add packages/cortex-native/src/components
git commit -m "test(cortex-native): pin className-painted surfaces against inline background regressions"
```

---

## Task 16: `Card` stops overriding className with an inline background

**Files:**
- Modify: `atoms/Card/Card.tsx`
- Test: `atoms/Card/Card.test.tsx`

**Interfaces:**
- Consumes: Task 7's `CardRoot`; Task 15's invariants; `PressableSurface`'s `effect`/`effectIntensity`/`effectStyle` props (`PressableSurface.tsx:15-22`).
- Produces: a `Card` whose consumer `className` actually paints. `PressableSurface`'s own contract is unchanged.

- [ ] **Step 1: Write the failing test**

```tsx
it('paints via className with no inline backgroundColor on the pressable branch', () => {
  const { getByTestId } = render(
    <Card testID="c" className="bg-red-500" onPress={() => undefined} />
  );
  const root = getByTestId('c');
  expect(root.props.className as string).toContain('bg-red-500');
  const style = root.props.style;
  const resolved = typeof style === 'function' ? style({ pressed: false }) : style;
  expect((StyleSheet.flatten(resolved) ?? {}).backgroundColor).toBeUndefined();
});

it('still darkens on press', () => {
  const { getByTestId } = render(<Card testID="c" onPress={() => undefined} />);
  const style = getByTestId('c').props.style;
  const pressed = typeof style === 'function' ? style({ pressed: true }) : style;
  expect((StyleSheet.flatten(pressed) ?? {}).backgroundColor).toBeDefined();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm --filter @tecsinapse/cortex-native test -t 'paints via className'`
Expected: FAIL — `Card` passes `surfaceColor`, so an inline `backgroundColor` is present at rest.

- [ ] **Step 3: Implement**

In `Card.tsx`, stop passing `surfaceColor` to `PressableSurface` and instead pass the resolved theme colour as the press-effect base only. `PressableSurface` computes `effectBaseColor = surfaceColor ?? surfaceVar ?? '#ffffff'` (`PressableSurface.tsx:34`) and already falls back to the same CSS variable, so dropping the prop keeps the pressed colour identical while removing the resting inline background. Delete the now-obsolete `useCSSVariable('--color-surface-overlay')` call and the explanatory comment at `Card.tsx:29-33`, replacing it with one line noting that the surface is painted by className and the press effect derives its base from `PressableSurface`'s own variable lookup.

- [ ] **Step 4: Run tests**

Run: `pnpm --filter @tecsinapse/cortex-native test`
Expected: PASS, including Task 15's Calendar/`MonthWeek`/`SelectYear`/`PressableSurface` invariants.

- [ ] **Step 5: Commit**

```bash
git add packages/cortex-native/src/components/atoms/Card
git commit -m "fix(cortex-native): let Card className paint instead of an inline surface colour"
```

---

## Task 17: Remaining inline-style purge

**Files:**
- Modify: `atoms/Input/Input.tsx:54-57`, `molecules/Header/FloatingButton.tsx` (created in Task 11)
- Test: `packages/cortex-native/src/inlineStyle.contract.test.tsx` (create)

**Interfaces:**
- Consumes: Tasks 8, 11.
- Produces: completion of spec §4. `Select.tsx`'s and `Tag.tsx`'s purges already landed in Tasks 14 and 13.

- [ ] **Step 1: Write the failing test**

```tsx
import React from 'react';
import { render } from '@testing-library/react-native';
import { StyleSheet } from 'react-native';

import Input from './components/atoms/Input/Input';

describe('layout expressed as classes, not inline styles', () => {
  it('Input renders its min height as a class', () => {
    const { getByTestId } = render(<Input inputContainerTestID="face" />);
    const face = getByTestId('face');
    expect(face.props.className as string).toContain('min-h-[50px]');
    expect((StyleSheet.flatten(face.props.style) ?? {}).minHeight).toBeUndefined();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm --filter @tecsinapse/cortex-native test -t 'layout expressed as classes'`
Expected: FAIL — `minHeight: 50` is inline (`Input.tsx:55`).

- [ ] **Step 3: Implement**

- `Input.tsx:54-57`: delete the `internalStyle` object; pass `className="min-h-[50px]"` to `Input.Face`, merged before the consumer's class. Keep threading `inputContainerStyle` so consumers who set it still win.
- `Header`'s `FloatingButton`/`DummyButton`: replace `style={{ aspectRatio: 1, height: 49, alignItems: 'center', justifyContent: 'center' }}` with `className="aspect-square h-[49px] items-center justify-center"` (and `aspect-square h-[49px]` for `DummyButton`), merged before `className`.

- [ ] **Step 4: Run tests**

Run: `pnpm --filter @tecsinapse/cortex-native test`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add packages/cortex-native/src
git commit -m "refactor(cortex-native): express layout as classes instead of inline styles"
```

---

## Task 18: Docs, stories, `@see` annotations, and full verification

**Files:**
- Modify: `docs/setup/cortex-native.mdx`, `.agents/skills/cortex-native-migration/references/component-mapping.md`, `packages/cortex-native/AGENTS.md`
- Create: `packages/cortex-native/docs/Composition.stories.tsx`
- Modify: the ~12 props carrying superseded injection props

**Interfaces:**
- Consumes: every prior task.
- Produces: the shipped, documented feature.

- [ ] **Step 1: Add `@see` JSDoc to superseded props**

On each, a one-line `@see` naming the part — no `@deprecated` (spec decision 6):

```tsx
/** @see Input.Left — composition alternative: `<Input.Face><Input.Left>…` */
leftComponent?: React.ReactNode;
```

Props: `leftComponent`, `rightComponent`, `hintComponent`, `LabelComponent` (`InputContainer.tsx:39-61`), `controlComponent` (`Select/types.ts`), `leftIcon`, `rightIcon` (`Snackbar.tsx:16-17`), `icon`, `value` (`Tag.tsx:10-11`), `leftButton`, `rightButton` (`Header.tsx:14-15`), `title` (`Button.tsx` — points at `Button.Label`).

- [ ] **Step 2: Write the composition story**

Create `packages/cortex-native/docs/Composition.stories.tsx` with one story per Tier 1 compound showing the composed form beside the monolith form. Stories are excluded from tsconfig and eslint, so they are documentation only.

- [ ] **Step 3: Document the contract**

In `docs/setup/cortex-native.mdx`, add a section stating: `className` is accepted on every component root and merges with the consumer's classes winning; `style` overrides everything; inner parts are reached through composition (`Card.Body`, `Input.Left`, `Select.Trigger`, …); legacy injection props still work. Add a "composed equivalent" column to `.agents/skills/cortex-native-migration/references/component-mapping.md` for the seven Tier 1 components. Add a Conventions bullet to `packages/cortex-native/AGENTS.md`: compose classes with `cn` from cortex-core, consumer `className` last, never `clsx`.

- [ ] **Step 4: Full verification, in CI order**

```bash
pnpm --filter @tecsinapse/cortex-native test
pnpm --filter @tecsinapse/cortex-react test
pnpm --filter @tecsinapse/cortex-native build:dts
pnpm --filter @tecsinapse/cortex-core build:dts
pnpm lint:fix
pnpm build:storybook
```

Expected: all green. `pnpm lint:fix` rewrites files — review its diff before committing.

- [ ] **Step 5: Smoke test in rn-playground**

Add (or extend) an rn-playground screen rendering each Tier 1 compound in composed form plus a `<Card className="bg-primary-light">` and a `<Button className="rounded-full">`, then run the app and confirm visually that consumer classes paint and the theme still flips light/dark. This is the deliverable proof — a passing unit suite does not demonstrate that uniwind resolves the merged class strings at runtime.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "docs(cortex-native): document className contract and composition parts"
```

---

## Self-Review

**Spec coverage:**

| Spec section | Task(s) |
|---|---|
| §1 `cn` foundation | 1 |
| §1 `clsx` → `cn`, className last | 2, 3 |
| §2 props extend RN primitive | 4 |
| §2 no `forwardRef` | 5 |
| §2 `Button` gains `children` | 6 |
| §3 compound idiom + `Root` static | 7 (pattern), 8-14 |
| §3 Input part set shared by 5 | 8, 9 |
| §3 `Select.Sheet` naming | 14 |
| §4 inline purge | 13 (Tag), 14 (Select), 16 (Card), 17 (Input, Header) |
| §5.1 className table test | 2, 3 |
| §5.2 style beats className | 7, 16 |
| §5.3 ref without forwardRef | 5 |
| §5.4 monolith ≡ composed | 9 (input family), and the legacy-prop tests in 7, 8, 11, 12, 13, 14 |
| §5.5 legacy props still work | 7, 8, 11, 12, 13, 14 |
| §5.6 Calendar/SelectYear/MonthWeek | 15 |
| §6 phase 4 docs | 18 |
| Decision 6 `@see` not `@deprecated` | 18 |
| Decision 7 no legacy aliases | enforced by Global Constraints (no task adds them) |

**Placeholder scan:** no TBD/TODO, no "add error handling", no "similar to Task N", no "write tests for the above". Three places instruct the implementer to read a specific props interface before finalising a test fixture (Tasks 3, 5, 14) — these name the exact file and forbid inventing props, rather than deferring a decision.

**Type consistency:** `cn(...inputs: ClassValue[]): string` is used identically in Tasks 2, 3, 7, 8, 11, 12, 13, 17. `Object.assign(XRoot, { Root: XRoot, ... })` with `X.Root === X` is identical across Tasks 7, 8, 10, 11, 12, 13, 14. Context hooks are uniformly `useXContext()` throwing `'... must be used within ...'` (Tasks 8, 10, 12, 13, 14). `inputContainerTestID` is introduced in Task 9 Step 3 and reused in Task 17. `Input.Face`/`Input.Box`/`Input.Hint` names are stable from Task 8 onward.
