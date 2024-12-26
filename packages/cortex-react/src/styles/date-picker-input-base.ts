import { tv } from 'tailwind-variants';

export const datePickerInputBase = tv({
  slots: {
    icon: 'mt-centi cursor-pointer',
  },
  variants: {
    disabled: {
      true: {
        icon: 'text-secondary-light cursor-default',
      },
    },
  },
});
