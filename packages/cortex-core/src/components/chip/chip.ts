import { tv } from 'tailwind-variants';

export const chip = tv({
  base: 'bg-inherit text-default border p-mili rounded-deca text-sm cursor-pointer shrink-0 flex gap-micro justify-center transition-all duration-300',
  variants: {
    isSelected: {
      true: 'bg-primary-medium text-inverse hover:bg-primary-xdark',
      false: 'hover:bg-surface-base',
    },
  },
});
