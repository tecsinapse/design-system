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
    },
    showAnimation: {
      true: 'transition-[width] duration-1000 ease-linear',
    },
  },
});
