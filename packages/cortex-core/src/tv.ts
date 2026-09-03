import { createTV } from 'tailwind-variants';

import { borderRadius, fontSize, spacing } from './tokens/definitions';

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
 * custom typography scale (`text-h1`, `text-label`, `text-micro`, ...) and
 * our custom spacing/radius scales (`mr-mili`, `p-centi`, `rounded-mili`,
 * ...).
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
 * `mr-0`, which is the whole point of merging `className` last.
 *
 * All recipes must import `tv` from here (or `@tecsinapse/cortex-core`)
 * instead of `tailwind-variants` directly.
 */
export const tv = createTV({ twMergeConfig });
