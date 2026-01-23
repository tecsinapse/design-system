import { tv } from 'tailwind-variants';

export const option = tv({
  base: 'flex flex-row gap-x-deca items-center text-base py-mili px-deca font-bold hover:bg-primary-xlight hover:text-primary-medium cursor-pointer active:text-primary-medium',
  variants: {
    selected: {
      true: 'text-primary-medium',
    },
    grouped: {
      true: 'px-mega',
    },
  },
});

export const selectVariants = tv({
  slots: {
    button:
      'disabled:pointer-events-none disabled:text-secondary-light flex w-full justify-between items-center bg-surface-overlay relative min-h-[44px] h-auto flex px-centi py-1.5 text-base font-bold items-center border border-secondary-light rounded-mili',
    groupedTitle: 'font-bold text-secondary-medium mx-centi',
    list: 'list-none p-0',
  },
  variants: {
    intent: {
      error: { button: 'border-error-light' },
      default: '',
    },
  },
});
