import { tv, VariantProps } from 'tailwind-variants';

const chipStyles = tv({
  base: 'bg-inherit text-default border p-mili rounded-deca text-sm cursor-pointer shrink-0 flex gap-micro justify-center transition-all duration-300',
  variants: {
    isSelected: {
      true: 'bg-primary-medium text-inverse hover:bg-primary-xdark',
      false: 'hover:bg-surface-base',
    },
  },
  defaultVariants: {
    isSelected: false,
  },
});

export type ChipVariants = VariantProps<typeof chipStyles> & {
  className?: string;
};

/**
 * Represents the chip component with specified variants.
 * @param {ChipVariants} props - The properties for the chip component.
 * @param {boolean=} [props.isSelected=false] - Applies the selected background/text color.
 * @param {string=} [props.className] - The additional CSS classes for the chip.
 */
export const chip = (props?: ChipVariants) => chipStyles(props);
