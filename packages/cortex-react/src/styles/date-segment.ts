import { tv } from 'tailwind-variants';

export const dateSegment = tv({
  slots: {
    base: 'focus:outline-none focus:bg-secondary-light',
  },
  variants: {
    disabled: {
      true: {
        base: 'text-secondary-light',
      },
    },
  },
});
