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

/**
 * Represents the hint component with specified variants.
 * @param {HintVariants} props - The properties for the hint component.
 * @param {string=} [props.intent=default] -  The background color of hint (e.g. default, success, warning, error).
 * @param {string=} [props.className] - The additional CSS classes hint the tag.
 * @param {string=} [props.class] - The additional CSS classes for the hint.
 */
export const hint = (props: HintVariants) => hint(props);
