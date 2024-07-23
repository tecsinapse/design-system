import { tv } from 'tailwind-variants';

export const option = tv({
  base: 'flex flex-row gap-x-deca items-center text-base py-mili px-deca font-bold hover:bg-primary-xlight hover:text-primary-medium cursor-pointer active:text-primary-medium',
  variants: {
    selected: {
      true: 'text-primary-medium',
    },
  },
});

export const selectVariants = tv({
  slots: {
    dropdown:
      'flex flex-col gap-y-mili text-base max-h-[30vh] w-full bg-white mt-0 rounded-mili overflow-y-scroll py-mili transition-all duration-300 origin-top-left absolute list-none z-30  shadow-lg',
    button:
      'flex w-full justify-between items-center bg-white relative min-h-[44px] h-auto flex px-centi py-1.5 text-base font-bold items-center bg-transparent border border-secondary-light rounded-mili',
    groupedTitle: 'font-bold text-secondary-medium',
    containerGrouped: 'mx-centi list-none',
  },
  variants: {
    open: {
      true: { dropdown: '-scale-y-1 visible' },
      false: { dropdown: 'scale-y-0 invisible' },
    },
    disabled: {
      true: {
        button: 'pointer-events-none text-secondary-light bg-secondary-xlight',
      },
    },
    intent: {
      error: { button: 'border-error-light' },
      default: '',
    },
  },
});
