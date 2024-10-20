import { tv } from 'tailwind-variants';

export const menubar = tv({
  slots: {
    header:
      'relative w-screen px-kilo py-deca flex flex-row justify-between bg-white z-sidebar',
    left: 'flex items-center w-fit',
    right: 'flex items-center gap-x-deca',
    dropdown:
      'w-full bg-white flex-1 shadow-default z-popover px-[8vw] absolute',
  },
  variants: {
    show: {
      true: {
        dropdown: 'pt-kilo pb-mega',
        false: 'max-h-0',
      },
    },
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

export const item = tv({
  slots: {
    container:
      'flex flex-row gap-x-deca items-center text-secondary-dark text-base',
    textBehavior: 'hover:text-primary-medium hover:cursor-pointer text-base',
    icon: 'text-primary-medium hover:cursor-pointer',
  },
});

export const category = tv({
  slots: {
    text: 'mb-mili font-bold',
    hr: 'mb-mili border-secondary-light',
    container: 'flex flex-col gap-y-mili',
  },
});

export const subItem = tv({
  slots: {
    container:
      'pl-deca text-sub border-l-[1px] border-primary-medium text-secondary-dark hover:text-primary-medium cursor-pointer',
  },
});

export const animate = tv({
  base: 'transition-all ease-in-out duration-250',
  variants: {
    show: {
      true: 'translate-y-0 opacity-1 visible',
      false: '-translate-y-[120%] opacity-0 invisible max-h-0',
    },
  },
});
