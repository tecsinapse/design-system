import { ClassProp, tv, VariantProps } from 'tailwind-variants';

const snackbarStyles = tv({
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
  defaultVariants: {
    intent: 'primary',
  },
});

type SnackbarVariants = VariantProps<typeof snackbarStyles> & ClassProp;

/**
 * Represents the snackbar component with specified variants.
 * @param {SnackbarVariants} props - The properties for the snackbar component.
 * @param {string=} [props.intent=primary] -  The intent variant for the snackbar (e.g., success, primary, secondary, info, white).
 * @param {string=} [props.className] - The additional CSS classes for the snackbar.
 * @param {string=} [props.class] - The additional CSS classes for the snackbar.
 */
export const snackbar = (props?: SnackbarVariants) => snackbarStyles(props);
