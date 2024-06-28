import { tv } from 'tailwind-variants';

export const calendarCell = tv({
  slots: {
    cell: 'text-center rounded-mili text-black',
    button: 'flex aspect-square items-center justify-center',
  },
  variants: {
    isSelected: {
      true: {
        cell: 'bg-primary-medium text-white',
      },
    },
    isSelectionStart: {
      true: {
        cell: 'bg-primary-medium rounded-r-none text-white',
      },
    },
    isSelectionEnd: {
      true: {
        cell: 'bg-primary-medium rounded-l-none text-white',
      },
    },
    inRange: {
      true: {
        cell: 'bg-primary-light rounded-none text-black',
      },
    },
    isOutsideVisibleRange: {
      true: {
        cell: 'text-secondary-light cursor-default',
        button: 'cursor-default',
      },
    },
  },
});
