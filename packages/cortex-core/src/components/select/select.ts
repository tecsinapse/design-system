import { ClassProp, tv, type VariantProps } from 'tailwind-variants';
import { inputBaseStyles } from '../input/input';

/**
 * Represents the button select component  (container to click).
 * @param {DropDownVariants} props - The properties for the button select component.
 * @param {string} [props.intent = default] -  The intent variant for the border color of button select (default success  warning error).
 * @param {string=} [props.className] - The additional CSS classes for the button select.
 * @param {string=} [props.class] - The additional CSS classes for the button select.
 */
export const buttonSelect = tv({
  extend: inputBaseStyles,
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
type DropDownVariants = VariantProps<typeof dropDownStyles> & ClassProp;
export interface DropDownProps
  extends Omit<DropDownVariants, 'open'>,
    Required<Pick<DropDownVariants, 'open'>> {}

/**
 * Represents the dropdown component  (where options are showed) with specified variants.
 * @param {DropDownVariants} props - The properties for the dropdown component.
 * @param {boolean} props.open -  The prop that define if dropdown to be showed  (true, false).
 * @param {string=} [props.className] - The additional CSS classes for the dropdown.
 * @param {string=} [props.class] - The additional CSS classes for the dropdown.
 */
export const dropdown = (props: DropDownVariants) => dropDownStyles(props);
