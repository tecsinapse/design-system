import { ClassProp, tv, VariantProps } from 'tailwind-variants';

const snackbarStyles = tv({
  base: 'animate-opacity flex flex-1 shadow-default text-base font-bold p-mili rounded-mili',
  variants: {
    intent: {
      default: 'bg-primary-xlight text-primary-medium',
      secondary: 'bg-secondary-xlight text-secondary-medium',
      success: 'bg-success-xlight text-success-medium',
      error: 'bg-error-xlight text-error-medium',
      info: 'bg-info-xlight text-info-medium',
      warning: 'bg-warning-xlight text-warning-medium',
    },
  },
  defaultVariants: {
    intent: 'default',
  },
});

export type SnackbarVariants = VariantProps<typeof snackbarStyles> & ClassProp;

/**
 * Represents the snackbar component with specified variants.
 * @param {SnackbarVariants} props - The properties for the snackbar component.
 * @param {string=} [props.intent=primary] -  The intent variant for the snackbar (e.g., success, primary, secondary, info, white).
 * @param {string=} [props.className] - The additional CSS classes for the snackbar.
 * @param {string=} [props.class] - The additional CSS classes for the snackbar.
 */
export const snackbar = (props?: SnackbarVariants) => snackbarStyles(props);
