import { tv } from 'tailwind-variants';

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
