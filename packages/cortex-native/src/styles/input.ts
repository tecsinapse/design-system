import { tv } from '@tecsinapse/cortex-core';

export type InputIntent = 'default' | 'success' | 'warning' | 'error';

/**
 * Native override of cortex-core `inputBaseStyles`.
 *
 * GATE (Task 6): the cortex-core recipe uses web-only variants (`focus-within:`,
 * `has-[:disabled]:`, `peer-*`, `placeholder-shown:`, `disabled:`) that compile
 * to UNCONDITIONAL rules under uniwind 1.11.0. Forked as static classes here;
 * focus/disabled state is applied explicitly from component state.
 */
export const inputContainerStyles = tv({
  base: 'relative min-h-[44px] h-auto flex flex-row px-centi py-1.5 bg-surface-overlay text-base font-bold items-center border rounded-mili',
  variants: {
    intent: {
      default: 'border-content-minimal',
      success: 'border-success-medium',
      warning: 'border-warning-medium',
      error: 'border-error-medium',
    },
  },
  defaultVariants: { intent: 'default' },
});

export const inputFocusedBorder: Record<InputIntent, string> = {
  default: 'border-content-medium',
  success: 'border-success-dark',
  warning: 'border-warning-dark',
  error: 'border-error-dark',
};

export const inputElementClasses =
  'w-full p-0 font-bold text-base text-content-high';

export const inputElementDisabledClasses = 'text-content-minimal';

export const inputContainerDisabledClasses = 'bg-transparent';
