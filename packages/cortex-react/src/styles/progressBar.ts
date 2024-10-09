import { tv } from 'tailwind-variants';

export const progressBarFilled = tv({
  base: 'h-full first:rounded-l-pill last:rounded-r-pill',
  variants: {
    intentProgress: {
      default: 'bg-primary-medium',
      error: 'bg-error-medium',
      info: 'bg-info-medium',
      warning: 'bg-warning-medium',
      success: 'bg-success-medium',
      uploading: '',
    },
    showAnimation: {
      true: 'transition-[width] duration-1000 ease-linear',
    },
  },
});

export const progressBarInfiniteVariants = tv({
  slots: {
    container: 'relative mb-mili',
    bar: 'h-1.5 w-full overflow-hidden',
    progress: 'w-full h-full origin-left-right rounded-b-mili',
  },
  variants: {
    status: {
      uploading: {
        progress: 'bg-info-medium animate-progress',
      },
      success: {
        progress: 'bg-success-medium',
      },
      error: {
        progress: 'bg-error-medium',
      },
      default: {
        progress: 'bg-primary-medium',
      },
      info: {
        progress: 'bg-info-medium',
      },
      warning: {
        progress: 'bg-warning-medium',
      },
    },
  },
});
