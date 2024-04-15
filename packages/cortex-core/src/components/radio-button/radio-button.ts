import { tv } from 'tailwind-variants';

export const radioButton = tv({
  base: 'accent-orange-600 h-5 w-5 cursor-pointer peer',
});

export const labelRadioButton = tv({
  base: 'cursor-pointer peer-checked:font-bold',
});
