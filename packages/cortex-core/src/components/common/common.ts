import { tv } from 'tailwind-variants';

export const overlay = tv({
  base: 'fixed',
  variants: {
    show: {
      true: 'bg-opacity-50 cursor-pointer z-[0] bg-black h-full w-full left-0 top-0 transition',
      false: 'invisible',
    },
  },
});
