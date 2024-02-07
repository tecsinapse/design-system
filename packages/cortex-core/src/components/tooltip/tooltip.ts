import { ClassProp, tv, VariantProps } from 'tailwind-variants';

export const tooltipContainer = tv({
  base: 'group relative inline-block',
});

const arrowTooltipStyles = tv({
  base: 'after:content-[""] after:absolute after:border-secondary-dark',
  variants: {
    position: {
      top: 'after:left-[50%] after:-ml-[5px] after:top-[100%] after:border-x-8 after:border-x-transparent after:border-t-[8px]',
      bottom:
        'after:left-[50%] after:-ml-[5px] after:bottom-[100%] after:border-x-8 after:border-x-transparent after:border-b-[8px]',
    },
  },
});
const tooltipStyles = tv({
  base: 'h-8 mt-deca w-max h-fit invisible group-hover:visible opacity-0 group-hover:opacity-100  bg-secondary-dark text-white px-centi py-micro rounded-mili absolute',
  variants: {
    position: {
      bottom: [
        arrowTooltipStyles({ position: 'bottom' }),
        '-ml-[200px] left-[50%] top-[100%] mt-centi -translate-y-[10%]',
      ],
      top: [
        arrowTooltipStyles({ position: 'top' }),
        '-ml-[200px] left-[50%] bottom-[100%] mb-centi translate-y-[10%]',
      ],
    },
  },
});

type TooltipVariants = VariantProps<typeof tooltipStyles> & ClassProp;

/**
 * Represents the tooltip component with specified variants.
 * @param {TooltipVariants} props - The properties for the tooltip component.
 * @param {string=} [props.position=left] -  The position of arrow of tooltip(e.g.left,right).
 * @param {string=} [props.className] - The additional CSS classes for the tooltip.
 * @param {string=} [props.class] - The additional CSS classes for the tooltip.
 */
export const tooltip = (props: TooltipVariants) => tooltipStyles(props);
