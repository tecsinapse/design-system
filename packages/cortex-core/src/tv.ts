import { createTV } from 'tailwind-variants';

import { borderRadius, borderWidth, fontSize, spacing } from './tokens/definitions';

export type { ClassProp, VariantProps } from 'tailwind-variants';

/**
 * Re-implementations of tailwind-merge's internal `isNumber` / `isTshirtSize`
 * validators (mirrored from tailwind-variants' bundled tailwind-merge fork —
 * they aren't part of its public API). Needed so registering our custom
 * `theme.spacing` / `theme.radius` keys below doesn't drop the ability to
 * merge the built-in scale (`p-2`, `rounded-lg`, ...).
 */
const isNumber = (value: string): boolean =>
  value !== '' && !Number.isNaN(Number(value));
const isTshirtSize = (value: string): boolean =>
  /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/.test(value);
/**
 * Custom border-width scale (`pico`/`nano`) keys, shared by every
 * `border-w*` classGroup override below.
 */
const borderWidthKeys = Object.keys(borderWidth);

export const twMergeConfig = {
  classGroups: {
    'font-size': [
      {
        text: [
          ...Object.keys(fontSize),
          'xs',
          'sm',
          'base',
          'lg',
          'xl',
          '2xl',
          '3xl',
          '4xl',
          '5xl',
          '6xl',
          '7xl',
          '8xl',
          '9xl',
        ],
      },
    ],
    /**
     * Custom border-width scale (`pico`/`nano`), registered against the
     * `border-w` group and every logical/physical side & axis variant
     * (`border-w-x/y/s/e/bs/be/t/r/b/l`) so `border-nano`, `border-t-pico`,
     * ... are recognized as real members of their groups — the same
     * problem `theme.spacing`/`theme.radius` solve for margin/padding/
     * radius below. Unlike spacing/radius, tailwind-merge's border-width
     * scale has no theme-getter indirection (it's inlined into each
     * `border-w*` group directly), so it can't be taught once via `theme`
     * and each group needs its own entry here instead.
     *
     * `twMergeConfig` is merged into tailwind-merge's defaults with
     * "extend" semantics (these arrays are concatenated onto the built-in
     * ones, not replacing them), so listing only our token keys is enough
     * — the built-in `''`/numeric/arbitrary-value validators (`border-2`,
     * `border-[3px]`, ...) stay registered without being hand-copied here.
     * They're internal to tailwind-merge's arbitrary-value parsing (unlike
     * the simple `isNumber`/`isTshirtSize` checks mirrored above), so
     * reimplementing them would risk drifting from tailwind-merge's actual
     * behavior.
     */
    'border-w': [{ border: borderWidthKeys }],
    'border-w-x': [{ 'border-x': borderWidthKeys }],
    'border-w-y': [{ 'border-y': borderWidthKeys }],
    'border-w-s': [{ 'border-s': borderWidthKeys }],
    'border-w-e': [{ 'border-e': borderWidthKeys }],
    'border-w-bs': [{ 'border-bs': borderWidthKeys }],
    'border-w-be': [{ 'border-be': borderWidthKeys }],
    'border-w-t': [{ 'border-t': borderWidthKeys }],
    'border-w-r': [{ 'border-r': borderWidthKeys }],
    'border-w-b': [{ 'border-b': borderWidthKeys }],
    'border-w-l': [{ 'border-l': borderWidthKeys }],
  },
  theme: {
    /**
     * Custom spacing scale (`nano`/`micro`/`mili`/`centi`/...). Backs every
     * group that resolves through tailwind-merge's spacing theme getter —
     * margin, padding, gap, min/max width & height, translate, etc. — so
     * `mr-mili`, `p-centi`, `min-h-kilo`, ... are recognized as real members
     * of their groups instead of being left unclassified (and therefore
     * unable to be overridden by a consumer's `className`, e.g. `mr-0`).
     * Keeps the built-in `px` / numeric scale (`p-2`, `m-4`, ...) working.
     */
    spacing: ['px', isNumber, ...Object.keys(spacing)],
    /**
     * Custom border-radius scale (`nano`/`micro`/`mili`/`centi`/`deca`/
     * `pill`), backing every `rounded*` group so `rounded-mili` merges
     * correctly. Keeps the built-in t-shirt scale (`rounded-sm`,
     * `rounded-lg`, ...) working.
     */
    radius: [isTshirtSize, ...Object.keys(borderRadius)],
  },
};

/**
 * Shared `tv` factory with a twMerge config that teaches tailwind-merge our
 * custom typography scale (`text-h1`, `text-label`, `text-micro`, ...), our
 * custom spacing/radius scales (`mr-mili`, `p-centi`, `rounded-mili`, ...),
 * and our custom border-width scale (`border-nano`, `border-t-pico`, ...).
 *
 * Why: tailwind-merge only knows the default t-shirt font-size scale, so
 * custom keys like `text-h1` fall into the text-color class group and get
 * dropped as a "conflict" whenever a color class (`text-primary-medium`,
 * `text-content-high`, ...) appears in the same recipe output — silently
 * removing font sizes. Registering the custom keys in the `font-size` group
 * fixes classification. Default scale names are kept so `text-sm` etc.
 * keep working. Custom spacing/radius keys are unclassified by default for
 * a related but opposite reason: tailwind-merge's spacing/radius theme
 * getters only recognize numeric/t-shirt values, so a class like
 * `mr-mili` never conflicts with anything — including a consumer's
 * `mr-0`, which is the whole point of merging `className` last. Custom
 * border-width keys have the opposite problem again: tailwind-merge's
 * border-width scale has no theme getter to hook a custom scale into (it's
 * inlined per classGroup), so `border-nano` is classified into the same
 * `border-w` group as `border-2` directly via the `classGroups` overrides
 * above instead of via `theme`.
 *
 * All recipes must import `tv` from here (or `@tecsinapse/cortex-core`)
 * instead of `tailwind-variants` directly.
 */
export const tv = createTV({ twMergeConfig });
