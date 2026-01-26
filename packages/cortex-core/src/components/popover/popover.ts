import { ClassProp, tv, VariantProps } from 'tailwind-variants';

export const popoverContainer = tv({
  base: 'group relative inline-block',
});

export const popoverStyles = tv({
  base: 'border border-gray-200 bg-surface-inverse text-white p-4 rounded-md shadow-lg z-50',
});

export type popoverVariants = VariantProps<typeof popoverStyles> & ClassProp;

/**
 * Represents the popover component with specified variants.
 * @param {popoverVariants} props - The properties for the popover component.
 * @param {string=} [props.position=left] -  The position of arrow of popover(e.g.left,right).
 * @param {string=} [props.className] - The additional CSS classes for the popover.
 * @param {string=} [props.class] - The additional CSS classes for the popover.
 */
export const popover = (props: popoverVariants) => popoverStyles(props);
