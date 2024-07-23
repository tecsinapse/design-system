import { ClassProp, tv, VariantProps } from 'tailwind-variants';
import { clsx } from 'clsx';

export const inputBaseStyles = tv({
  base: 'relative min-h-[44px] h-auto flex px-centi py-1.5 bg-white focus-within:outline focus-within:outline-1 text-base font-bold items-center border rounded-mili has-[:disabled]:bg-transparent',
  variants: {
    intent: {
      default: [
        'input-secondary',
        'border-secondary-light',
        'focus-within:border-secondary-dark',
        'focus-within:outline-secondary-dark',
      ],
      success: [
        'input-success',
        'border-success-medium',
        'focus-within:border-success-dark',
        'focus-within:outline-success-dark',
      ],
      warning: [
        'input-warning',
        'border-warning-medium',
        'focus-within:border-warning-dark',
        'focus-within:outline-warning-dark',
      ],
      error: [
        'input-error',
        'border-error-medium',
        'focus-within:border-error-dark',
        'focus-within:outline-error-dark',
      ],
    },
  },
  defaultVariants: {
    intent: 'default',
  },
});

const labelBaseStyles = tv({
  base: 'absolute duration-300 -translate-y-2 scale-[0.72] top-2.5 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-0 peer-focus:scale-[0.72] peer-focus:-translate-y-2 peer-focus:top-2.5 font-bold text-base peer-disabled:text-secondary-light select-none w-max',
  variants: {
    intent: {
      default: [
        'text-secondary-medium',
        'peer-focus:text-secondary-medium',
        'peer-placeholder-shown:text-secondary-medium',
      ],
      success: ['text-success-medium'],
      warning: ['text-warning-medium'],
      error: ['text-error-medium'],
    },
  },
  defaultVariants: {
    intent: 'default',
  },
});

export interface LabelVariants extends VariantProps<typeof labelBaseStyles> {
  className?: string;
  placeholder?: string;
}

export const labelStyle = ({ intent, placeholder, className }: LabelVariants) =>
  labelBaseStyles({
    intent,
    className: clsx(className, {
      'peer-placeholder-shown:hidden': !!placeholder,
    }),
  });

export const inputBox = (
  placeholder?: string,
  label?: string,
  className?: string
) =>
  clsx(
    className,
    'peer relative outline-none placeholder:text-base placeholder:text-secondary-medium placeholder-shown:top-0 disabled:placeholder:text-secondary-light disabled:text-secondary-light bg-transparent',
    {
      'focus:top-1.5': !placeholder && !!label,
      'top-1.5': !!label,
    }
  );

export type InputBaseVariants = VariantProps<typeof inputBaseStyles> &
  ClassProp;

/**
 * Represents the input component  (container to click).
 * @param {InputBaseVariants} props - The properties for the input component.
 * @param {string=} [props.intent = default] -  The intent variant for the border color of input (default, success, warning, error).
 * @param {string=} [props.className] - The additional CSS classes for the input.
 * @param {string=} [props.class] - The additional CSS classes for the input.
 */
export const input = (props?: InputBaseVariants) => inputBaseStyles(props);

export type LabelBaseVariants = ClassProp &
  VariantProps<typeof labelBaseStyles> & {
    placeholder?: string;
  };

/**
 * Represents the label component  (container to click).
 * @param {LabelBaseVariants} props - The properties for the input component.
 * @param {string=} [props.intent = default] -  The intent variant for the border color of input (default, success, warning, error).
 * @param {string=} [props.className] - The additional CSS classes for the input.
 * @param {string=} [props.class] - The additional CSS classes for the input.
 */
export const label = (props: LabelBaseVariants) => {
  const { placeholder, intent } = props;
  return labelBaseStyles({
    intent: intent,
    className: clsx(String(props.className) ?? props.class, {
      'peer-placeholder-shown:hidden': !!placeholder,
    }),
  });
};
