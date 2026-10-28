import { tv } from '@tecsinapse/cortex-core';

export const timePickerInputBase = tv({
  slots: {
    icon: 'cursor-pointer text-deca',
  },
  variants: {
    disabled: {
      true: {
        icon: 'text-content-minimal cursor-default',
      },
    },
  },
});
