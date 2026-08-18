import { tv } from 'tailwind-variants';

export type SnackbarIntent =
  | 'default'
  | 'secondary'
  | 'success'
  | 'error'
  | 'info'
  | 'warning';

/**
 * Native override of cortex-core `snackbar` recipe.
 *
 * GATE (Task 6): the cortex-core recipe base uses `animate-opacity` (a
 * web-only animation token, not in tokens-native.css) and is web-oriented.
 * Forked as static classes; opacity animation is driven by RN Animated (the
 * native entry/exit mechanism), not the web animation class.
 */
export const snackbarStyles = tv({
  base: 'flex flex-1 text-base font-bold p-mili rounded-mili',
  variants: {
    intent: {
      default: 'bg-primary-xlight text-primary-medium',
      secondary: 'bg-content-inverse text-content-low',
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
