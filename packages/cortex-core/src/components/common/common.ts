import { tv } from 'tailwind-variants';

export const overlay = tv({
  base: 'fixed',
  variants: {
    show: {
      true: 'z-backdrop bg-black/50 h-full w-full left-0 top-0 transition cursor-pointer',
      false: 'invisible',
    },
  },
});
