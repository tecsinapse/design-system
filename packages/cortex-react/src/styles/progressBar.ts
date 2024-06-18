import { tv } from 'tailwind-variants';

export const progressBarFilled = tv({
  base: 'h-full',
  variants: {
    intentProgress: {
      default: 'bg-primary-medium',
      error: 'bg-error-medium',
      info: 'bg-info-medium',
      warning: 'bg-warning-medium',
      success: 'bg-success-medium',
    },
  },
});
