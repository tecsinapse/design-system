import { tv, VariantProps } from 'tailwind-variants';

const badgeStyles = tv({
  base: 'text-sub text-white font-bold rounded-pill absolute items-center flex justify-center w-[1rem] h-[1rem] -top-1 -right-1 px-[5px] py-[2px]',
  variants: {
    intent: {
      primary: 'bg-primary-medium',
      secondary: 'bg-secondary-medium',
      error: 'bg-error-medium',
      success: 'bg-success-medium',
      warning: 'bg-warning-medium',
      info: 'bg-info-medium',
    },
  },
  defaultVariants: {
    intent: 'primary',
  },
});

export const containerBadge = tv({
  base: 'relative items-center justify-center self-center',
});

export type BadgeVariants = VariantProps<typeof badgeStyles>;
export const badge = (props: BadgeVariants) => badge(props);
