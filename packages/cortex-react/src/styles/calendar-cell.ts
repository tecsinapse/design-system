import { tv } from 'tailwind-variants';

export const calendarCell = tv({
  slots: {
    cell: 'text-center rounded-mili hover:bg-primary-light',
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
        cell: 'bg-primary-medium border-2 border-primary-medium text-white hover:bg-primary-medium',
      },
    },
    isSelectionStart: {
      true: {
        cell: 'bg-primary-medium border-2 border-primary-medium rounded-r-none text-white',
      },
    },
    isSelectionEnd: {
      true: {
        cell: 'bg-primary-medium border-2 border-primary-medium rounded-l-none text-white',
      },
    },
    inRange: {
      true: {
        cell: 'bg-primary-light border-0 rounded-none text-black',
      },
    },
    isDisabled: {
      true: {
        cell: 'text-content-minimal cursor-default  hover:bg-surface-overlay',
        button: 'cursor-default',
      },
    },
  },
});
