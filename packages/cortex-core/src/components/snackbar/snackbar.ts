import { tv } from 'tailwind-variants';

export const snackbar = tv({
  base: 'animate-bottomToTop text-base font-bold p-mili flex justify-between fixed rounded-mili left-[50%] bottom-deca',
  variants: {
    intent: {
      primary: 'bg-primary-xlight text-primary-medium',
      secondary: 'bg-secondary-xlight text-secondary-medium',
      success: 'bg-success-xlight text-success-medium',
      error: 'bg-error-xlight text-error-medium',
      info: 'bg-info-xlight text-info-medium',
      warning: 'bg-warning-xlight text-warning-medium',
    },
  },
});
