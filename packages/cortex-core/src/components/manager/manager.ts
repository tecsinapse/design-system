import { tv } from 'tailwind-variants';

export const manager = tv({
  base: 'fixed rounded-micro p-deca bg-white shadow-xl flex transition bottom-deca right-deca z-modal',
  variants: {
    open: {
      true: 'scale-100 visible',
      false: 'invisible',
    },
  },
});
