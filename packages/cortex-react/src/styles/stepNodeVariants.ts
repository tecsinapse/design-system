import { tv } from 'tailwind-variants';

export const StepNodeVariants = tv({
  slots: {
    container: 'flex flex-col items-center justify-center text-center w-full',
    content: 'flex p-mili text-center w-full text-sub justify-center font-bold',
    separator: 'h-micro w-full',
  },
  variants: {
    intent: {
      success: {
        separator: 'bg-success-medium',
      },
      warning: {
        separator: 'bg-warning-medium',
      },
      error: {
        separator: 'bg-error-medium',
      },
    },
    interactive: {
      true: {
        content: 'cursor-pointer',
      },
    },
    marked: {
      true: {
        content: 'font-bold',
      },
      false: {
        content: 'text-secondary-medium',
        separator: 'bg-secondary-light',
      },
    },
    selected: {
      true: {
        content: 'text-primary-medium',
      },
    },
    isFirst: {
      true: {
        separator: 'rounded-l-lg',
      },
    },
    isLast: {
      true: {
        separator: 'rounded-r-lg',
      },
    },
    disabled: {
      true: {
        container: 'opacity-50 cursor-not-allowed',
        content: 'pointer-events-none',
      },
    },
  },
  defaultVariants: {
    intent: 'success',
    marked: false,
    selected: false,
    disabled: false,
  },
});
