import { ClassProp, tv, VariantProps } from 'tailwind-variants';

const hintStyles = tv({
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

export type HintVariants = VariantProps<typeof hintStyles> & ClassProp;
export const hint = (props: HintVariants) => hintStyles(props);
