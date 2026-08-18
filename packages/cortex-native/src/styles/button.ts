import { tv, type VariantProps } from 'tailwind-variants';

export const buttonStyles = tv({
  base: 'font-bold items-center justify-center rounded-mili',
  variants: {
    intent: {
      primary: 'bg-primary-medium text-on-primary',
      secondary: 'bg-content-low text-content-low',
      success: 'bg-success-medium text-success-medium',
      info: 'bg-info-medium text-info-medium',
      warning: 'bg-warning-medium text-warning-medium',
      error: 'bg-error-medium text-error-medium',
    },
    variant: {
      outline: 'bg-transparent border',
      text: 'bg-transparent border-0',
      filled: '',
    },
    size: {
      default: 'px-kilo py-mili min-h-[44px]',
      small: 'px-deca py-mili min-h-[34px]',
      square: 'p-[14px] aspect-square',
      circle: 'p-[14px] rounded-full',
      base: '',
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
