import { tv } from 'tailwind-variants';

export const drawer = tv({
  base: 'bg-white fixed  top-0 h-full p-deca shadow-lg transition-all duration-500 transform peer-checked:translate-x-0',
  variants: {
    position: {
      left: 'left-0 -translate-x-full rounded-r-mili',
      right: 'right-1 translate-x-full rounded-l-mili',
    },
  },
  defaultVariants: {
    position: 'left',
  },
});

export const overlay = tv({
  base: 'fixed h-full w-full left-0 top-0 transition peer-checked:bg-black peer-checked:bg-opacity-50 z-[-1] peer-checked:z-[0] peer-checked:cursor-pointer',
});
