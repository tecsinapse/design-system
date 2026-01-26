import { tv } from 'tailwind-variants';

export const ProgressVariants = tv({
  slots: {
    container: 'relative',
    bar: 'h-1.5 w-full overflow-hidden bg-content-inverse',
    progress: 'w-full h-full rounded-mili',
  },
  variants: {
    intent: {
      default: {
        progress: 'bg-primary-medium',
      },
      error: {
        progress: 'bg-error-medium',
      },
      info: {
        progress: 'bg-info-medium',
      },
      warning: {
        progress: 'bg-warning-medium',
      },
      success: {
        progress: 'bg-success-medium',
      },
    },
    infinite: {
      true: {
        progress: 'animate-progress origin-left-right',
      },
    },
  },
});
