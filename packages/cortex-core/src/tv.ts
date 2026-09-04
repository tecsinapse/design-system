import { createTV } from 'tailwind-variants';

import { fontSize } from './tokens/definitions';

export type { ClassProp, VariantProps } from 'tailwind-variants';

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
};

/**
 * Shared `tv` factory with a twMerge config that teaches tailwind-merge our
 * custom typography scale (`text-h1`, `text-label`, `text-micro`, ...).
 *
 * Why: tailwind-merge only knows the default t-shirt font-size scale, so
 * custom keys like `text-h1` fall into the text-color class group and get
 * dropped as a "conflict" whenever a color class (`text-primary-medium`,
 * `text-content-high`, ...) appears in the same recipe output — silently
 * removing font sizes. Registering the custom keys in the `font-size` group
 * fixes classification. Default scale names are kept so `text-sm` etc.
 * keep working.
 *
 * All recipes must import `tv` from here (or `@tecsinapse/cortex-core`)
 * instead of `tailwind-variants` directly.
 */
export const tv = createTV({ twMergeConfig });
