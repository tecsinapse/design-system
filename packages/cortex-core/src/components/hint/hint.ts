import { tv, VariantProps } from 'tailwind-variants';

export const hint = tv({
  base: 'text-label font-bold flex items-center',
  variants: {
    intent: {
      default: 'text-secondary-medium',
      success: 'text-success-medium',
      warning: 'text-warning-medium',
      error: 'text-error-medium',
    },
  },
  defaultVariants: { intent: 'default' },
});

export interface HintVariants extends VariantProps<typeof hint> {
  className?: string;
}
