import { tv, VariantProps } from 'tailwind-variants';

const cardStyles = tv({
  base: 'rounded-mili shadow-default bg-surface-overlay p-deca',
  variants: {
    selectable: {
      true: 'bg-inherit border cursor-pointer shadow-none hover:shadow-sm duration-300 transition-all',
    },
    isSelected: {
      true: 'border-primary-medium',
    },
  },
});

export type CardVariants = VariantProps<typeof cardStyles> & {
  className?: string;
};

/**
 * Represents the card component with specified variants.
 * @param {CardVariants} props - The properties for the card component.
 * @param {boolean=} [props.selectable] - Applies interactive styling (cursor pointer, hover shadow).
 * @param {boolean=} [props.isSelected] - Applies the selected border color; only meaningful when `selectable`.
 * @param {string=} [props.className] - The additional CSS classes for the card.
 * @param {string=} [props.class] - The additional CSS classes for the card.
 */
export const card = (props?: CardVariants) => cardStyles(props);
