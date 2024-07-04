import { tv } from 'tailwind-variants';
export const menubar = tv({
  slots: {
    root: 'w-screen px-kilo py-deca flex flex-row justify-between bg-white',
    left: 'flex items-center w-fit',
    right: 'flex items-center gap-x-deca',
    dropdown: 'w-full bg-white flex-1 pt-kilo pb-mega shadow-default px-[8vw]',
  },
});

export const mostUsed = tv({
  slots: {
    container: 'mb-kilo',
    label: 'font-bold mb-centi',
    containerList: 'gap-x-kilo flex flex-row',
  },
});

export const mostUsedItem = tv({
  slots: {
    container: 'flex-1 py-mili',
    title: 'text-primary-medium font-bold',
    category: 'text-secondary-medium',
  },
});

export const animate = tv({
  base: 'transition-all ease-in-out duration-250',
  variants: {
    show: {
      true: 'translate-y-0 opacity-1 visible',
      false: '-translate-y-[120%] opacity-0 invisible',
    },
  },
});
