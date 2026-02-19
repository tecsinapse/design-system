import { tv } from 'tailwind-variants';

export const modal = tv({
  base: 'fixed rounded-micro p-kilo bg-surface-overlay shadow-default flex transition inset-0 m-auto max-w-fit z-modal text-default',
  variants: {
    open: {
      true: 'scale-100 visible',
      false: 'invisible',
    },
  },
});
