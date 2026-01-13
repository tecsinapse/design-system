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

export const pressableSurface = tv({
  base: 'rounded-mili flex flex-1 justify-center py-mili font-bold hover:cursor-pointer',
  variants: {
    selected: {
      true: 'border text-black border-secondary-light',
      false: 'text-secondary-medium  hover:bg-secondary-xlight hover:border'
    }
  }
})