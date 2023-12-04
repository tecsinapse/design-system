import { tv } from 'tailwind-variants';

export const checkbox = tv({
  base: 'appearance-none w-[15px] h-[15px] border border-primary-medium rounded-nano bg-white checked:bg-primary-medium before:w-[10px] before:h-[10px] before:bg-black',
});
