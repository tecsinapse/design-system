import { createTV } from 'tailwind-variants';
import { fontSize } from '@tecsinapse/cortex-core';

const myTV = createTV({
  twMergeConfig: {
    //passar tema?
    classGroups: {
      'font-size': [{ text: Object.keys(fontSize) }],
    },
  },
});

export const tag = myTV({
  base: 'rounded-micro px-micro py-nano w-fit font-bold text-label',
  variants: {
    intent: {
      success: 'bg-success-medium text-white',
      primary: 'bg-primary-medium text-white',
      secondary: 'bg-secondary-medium text-white',
      info: 'bg-info-medium text-white',
      white: 'bg-white text-secondary-medium',
    },
  },
  defaultVariants: {
    intent: 'secondary',
  },
});
