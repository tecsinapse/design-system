import { tv } from 'tailwind-variants';

export const modal = tv({
  base: 'fixed rounded-micro p-kilo bg-white shadow-default flex transition inset-0',
  variants: {
    open: {
      true: 'scale-100 visible',
      false: 'invisible',
    },
  },
});
