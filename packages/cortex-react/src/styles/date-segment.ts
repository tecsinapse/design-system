import { tv } from '@tecsinapse/cortex-core';

export const dateSegment = tv({
  slots: {
    base: 'focus:outline-none focus:bg-content-minimal',
  },
  variants: {
    disabled: {
      true: {
        base: 'text-content-minimal',
      },
    },
  },
});
