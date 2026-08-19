import { tv, type VariantProps } from 'tailwind-variants';

export const buttonStyles = tv({
  base: 'font-bold text-base items-center justify-center text-on-primary',
  variants: {
    intent: {
      primary: 'bg-primary-medium',
      secondary: 'bg-content-low',
      success: 'bg-success-medium',
      info: 'bg-info-medium',
      warning: 'bg-warning-medium',
      error: 'bg-error-medium',
    },
    variant: {
      outline: 'bg-transparent border',
      text: 'bg-transparent border-0',
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
    { intent: 'primary', variant: 'outline', className: 'text-primary-medium border-primary-medium' },
    { intent: 'primary', variant: 'text', className: 'text-primary-medium' },
    { intent: 'secondary', variant: 'outline', className: 'text-content-low border-content-low' },
    { intent: 'secondary', variant: 'text', className: 'text-content-low' },
    { intent: 'success', variant: 'outline', className: 'text-success-medium border-success-medium' },
    { intent: 'success', variant: 'text', className: 'text-success-medium' },
    { intent: 'info', variant: 'outline', className: 'text-info-medium border-info-medium' },
    { intent: 'info', variant: 'text', className: 'text-info-medium' },
    { intent: 'warning', variant: 'outline', className: 'text-warning-medium border-warning-medium' },
    { intent: 'warning', variant: 'text', className: 'text-warning-medium' },
    { intent: 'error', variant: 'outline', className: 'text-error-medium border-error-medium' },
    { intent: 'error', variant: 'text', className: 'text-error-medium' },
  ],
  defaultVariants: {
    intent: 'primary',
    size: 'default',
    variant: 'filled',
  },
});
export type ButtonVariants = VariantProps<typeof buttonStyles>;

export const buttonForegroundColorVars: Record<
  NonNullable<ButtonVariants['intent']>,
  string
> = {
  primary: '--color-primary-medium',
  secondary: '--color-secondary-medium',
  success: '--color-success-medium',
  info: '--color-info-medium',
  warning: '--color-warning-medium',
  error: '--color-error-medium',
};

export const getButtonForegroundColorVar = (
  intent: NonNullable<ButtonVariants['intent']>,
  variant: NonNullable<ButtonVariants['variant']>,
) => (variant === 'filled' ? '--color-on-primary' : buttonForegroundColorVars[intent]);
