import { tv, VariantProps, ClassProp } from 'tailwind-variants';

export const buttonStyles = tv({
  base: 'p-deca text-base h-fit font-bold disabled:text-white enabled:active:scale-95 transform transition hover:text-white text-white cursor-pointer items-center flex justify-center',
  variants: {
    intent: {
      primary:
        'bg-primary-medium disabled:bg-primary-light active:bg-primary-dark enabled:hover:border-primary-dark hover:bg-primary-dark',
      secondary:
        'bg-secondary-medium disabled:bg-secondary-light active:bg-secondary-dark hover:bg-secondary-dark hover:border-secondary-dark ',
      success:
        'bg-success-medium disabled:bg-success-light hover:bg-success-dark hover:border-success-dark',
      info: ' bg-info-medium disabled:bg-info-light hover:bg-info-dark hover:border-info-dark ',
      warning:
        ' bg-warning-medium disabled:bg-warning-light hover:bg-warning-dark hover:border-warning-dark',
      error:
        'bg-error-medium disabled:bg-error-light hover:bg-error-dark hover:border-error-dark',
    },
    variant: {
      outline: 'bg-transparent disabled:bg-transparent',
      text: 'bg-transparent border-0 disabled:bg-transparent',
      filled: '',
    },
    size: {
      default: 'px-kilo rounded-mili py-mili min-h-[44px]',
      small: 'px-deca rounded-mili py-mili min-h-[34px]',
      square: 'p-[14px] rounded-mili min-h-fit aspect-square',
      circle: 'p-[14px] rounded-full min-h-fit',
    },
  },
  compoundVariants: [
    {
      intent: 'primary',
      variant: 'outline',
      className:
        'text-primary-medium disabled:text-primary-light border border-primary-medium disabled:border-primary-light',
    },
    {
      intent: 'secondary',
      variant: 'outline',
      className:
        'text-secondary-medium disabled:text-secondary-light border border-secondary-medium disabled:border-secondary-light',
    },
    {
      intent: 'success',
      variant: 'outline',
      className:
        'text-success-medium  disabled:text-success-light border border-success-medium disabled:border-success-light hover:bg-success-medium hover:border-success-medium',
    },
    {
      intent: 'info',
      variant: 'outline',
      className:
        'text-info-medium disabled:text-info-light border border-info-medium disabled:border-info-light hover:bg-info-medium hover:border-info-medium',
    },
    {
      intent: 'warning',
      variant: 'outline',
      className:
        'text-warning-medium disabled:text-warning-light border border-warning-medium disabled:border-warning-light hover:bg-warning-medium hover:border-warning-medium',
    },
    {
      intent: 'error',
      variant: 'outline',
      className:
        'text-error-medium disabled:text-error-light border border-error-medium hover:border-error-medium hover:bg-error-medium disabled:border-error-light',
    },
    {
      intent: 'primary',
      variant: 'text',
      className: 'text-primary-medium disabled:text-primary-light',
    },
    {
      intent: 'secondary',
      variant: 'text',
      className: 'text-secondary-medium disabled:text-secondary-light',
    },
    {
      intent: 'success',
      variant: 'text',
      className:
        'text-success-medium disabled:text-success-light hover:bg-success-medium hover:border-success-medium',
    },
    {
      intent: 'info',
      variant: 'text',
      className:
        'text-info-medium disabled:text-info-light hover:bg-info-medium hover:border-info-medium',
    },
    {
      intent: 'warning',
      variant: 'text',
      className:
        'text-warning-medium disabled:text-warning-light hover:bg-warning-medium hover:border-warning-medium',
    },
    {
      intent: 'error',
      variant: 'text',
      className:
        'text-error-medium disabled:text-error-light hover:border-error-medium hover:bg-error-medium',
    },
  ],
  defaultVariants: {
    intent: 'primary',
    size: 'default',
    variant: 'filled',
  },
});
export type ButtonVariants = VariantProps<typeof buttonStyles> & ClassProp;

/**
 * Represents the button component with specified variants.
 * @param {ButtonVariants} props - The properties for the button component.
 * @param {string=} [props.intent=primary] -  The intent variant for the button (e.g., success, primary, secondary, info, white).
 * @param {string=} [props.size=default] -  The size of button (e.g., default, small, square,large).
 * @param {string=} [props.variant] -  The type of button (e.g., outline, default, text).
 * @param {string=} [props.className] - The additional CSS classes for the button.
 * @param {string=} [props.class] - The additional CSS classes for the button.
 */
export const button = (props?: ButtonVariants) => buttonStyles(props);
