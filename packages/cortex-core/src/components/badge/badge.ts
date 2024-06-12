import { tv, VariantProps, ClassProp } from 'tailwind-variants';

const badgeStyles = tv({
  base: 'text-sub text-white font-bold rounded-pill',
  variants: {
    intent: {
      primary: 'bg-primary-medium',
      secondary: 'bg-secondary-medium',
      error: 'bg-error-medium',
      success: 'bg-success-medium',
      warning: 'bg-warning-medium',
      info: 'bg-info-medium',
    },
    isAnchor: {
      true: 'absolute items-center flex justify-center w-[1rem] h-[1rem] -top-1 -right-1 px-[5px] py-[2px]',
      false: 'px-[5px]',
    },
  },
  defaultVariants: {
    intent: 'primary',
    isAnchor: false,
  },
});

export const containerBadge = tv({
  base: 'relative items-center justify-center self-center w-fit',
});

export type BadgeVariants = VariantProps<typeof badgeStyles> & ClassProp;
export const badge = (props?: BadgeVariants) => badgeStyles(props);
