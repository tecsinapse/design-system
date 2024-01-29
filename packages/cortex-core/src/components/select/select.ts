import { tv, type VariantProps } from 'tailwind-variants';
import { inputBase } from '../input';

export const buttonSelect = tv({
  extend: inputBase,
  base: 'w-full justify-between bg-white gap-[200px]',
});
export const option = tv({
  base: 'text-base py-mili px-deca font-bold hover:bg-primary-xlight hover:text-primary-medium cursor-pointer active:text-primary-medium',
});

const dropDownStyles = tv({
  base: 'text-base max-h-[200px] w-full bg-white mt-mili rounded-mili overflow-y-scroll py-mili transition-all duration-300 origin-top-left',
  variants: {
    open: {
      true: '-scale-y-1 opacity-1',
      false: 'scale-y-0 opacity-0',
    },
  },
});
type DropDownVariants = VariantProps<typeof dropDownStyles>;
export interface DropDownProps
  extends Omit<DropDownVariants, 'open'>,
    Required<Pick<DropDownVariants, 'open'>> {}

export const dropdown = (props: DropDownProps) => dropDownStyles(props);
