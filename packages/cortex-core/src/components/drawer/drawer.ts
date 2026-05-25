import { ClassProp, tv, VariantProps } from 'tailwind-variants';

const drawerStyles = tv({
  base: 'bg-surface-overlay fixed  top-0 h-full p-deca shadow-lg transition-all duration-500 transform overflow-y-scroll',
  variants: {
    position: {
      left: 'left-0 -translate-x-full rounded-r-mili',
      right: 'right-1 translate-x-full rounded-l-mili',
    },
    open: {
      true: 'translate-x-0 z-drawer',
      false: 'invisible',
    },
  },
  defaultVariants: {
    position: 'left',
  },
});

export type DrawerVariants = VariantProps<typeof drawerStyles> & ClassProp;

/**
 * Represents the drawer component with specified variants.
 * @param {DrawerVariants} props - The properties for the drawer component.
 * @param {string=} [props.position=left] -  The position of drawer in screen (e.g., left,right).
 * @param {string=} [props.className] - The additional CSS classes for the drawer.
 * @param {string=} [props.class] - The additional CSS classes for the drawer.
 */
export const drawer = (props: DrawerVariants) => drawerStyles(props);
