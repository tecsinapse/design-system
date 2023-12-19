import { tv } from 'tailwind-variants';
import { inputBase } from '../input';

export const buttonSelect = tv({
  extend: inputBase,
  base: 'w-full justify-between bg-white gap-[200px]',
});
export const option = tv({
  base: 'text-base py-mili px-deca font-bold hover:bg-primary-xlight hover:text-primary-medium cursor-pointer active:text-primary-medium',
});

export const dropDown = tv({
  base: 'text-base max-h-[200px] w-full bg-white mt-mili rounded-mili overflow-y-scroll py-mili transition-all duration-300 origin-top-left',
  variants: {
    open: {
      true: '-scale-y-1 opacity-1',
      false: 'scale-y-0 opacity-0',
    },
  },
});
