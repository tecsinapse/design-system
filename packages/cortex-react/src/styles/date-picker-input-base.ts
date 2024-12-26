import { tv } from 'tailwind-variants';

export const datePickerInputBase = tv({
  slots: {
    icon: 'cursor-pointer',
  },
  variants: {
    disabled: {
      true: {
        icon: 'text-secondary-light cursor-default',
      },
    },
  },
});
