import { tv } from 'tailwind-variants';

export const radioButtonStyles = tv({
  slots: {
    container: 'gap-x-mili flex items-center justify-center',
    label: 'cursor-pointer peer-checked:font-bold ',
    input: 'accent-orange-600 h-5 w-5 cursor-pointer peer',
  },
  variants: {
    reversed: {
      true: {
        container: 'flex-row-reverse',
      },
    },
  },
});
