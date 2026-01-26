import { tv } from 'tailwind-variants';

export const datePickerInputBase = tv({
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
