import { tv } from 'tailwind-variants';

export const calendarCell = tv({
  slots: {
    cell: 'text-center rounded-mili text-black hover:bg-primary-light',
    button: 'flex aspect-square items-center justify-center',
  },
  variants: {
    isToday: {
      true: {
        cell: 'border-primary-light border-2',
      },
    },
    isSelected: {
      true: {
        cell: 'bg-primary-medium border-2 border-primary-medium text-light hover:bg-primary-medium',
      },
    },
    isSelectionStart: {
      true: {
        cell: 'bg-primary-medium border-2 border-primary-medium rounded-r-none text-light',
      },
    },
    isSelectionEnd: {
      true: {
        cell: 'bg-primary-medium border-2 border-primary-medium rounded-l-none text-light',
      },
    },
    inRange: {
      true: {
        cell: 'bg-primary-light border-0 rounded-none text-black',
      },
    },
    isDisabled: {
      true: {
        cell: 'text-secondary-light cursor-default  hover:bg-white-500',
        button: 'cursor-default',
      },
    },
  },
});
