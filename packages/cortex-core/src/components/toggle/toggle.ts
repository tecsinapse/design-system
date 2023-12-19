import { tv } from 'tailwind-variants';

export const toggle = tv({
  base: "peer h-[22px] w-[40px] rounded-full bg-secondary-light after:absolute after:left-micro after:top-[3px] after:h-deca after:w-deca after:rounded-full after:border after:border-white after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none",
  variants: {
    intent: {
      primary: 'peer-focus:primary-medium peer-checked:bg-primary-medium',
      secondary: 'peer-focus:secondary-medium peer-checked:bg-secondary-medium',
      info: 'peer-focus:info-medium peer-checked:bg-info-medium',
      success: 'peer-focus:success-medium peer-checked:bg-success-medium',
      warning: 'peer-focus:warning-medium peer-checked:bg-warning-medium',
      error: 'peer-focus:error-medium peer-checked:bg-error-medium',
    },
  },
  defaultVariants: {
    intent: 'primary',
  },
});

export const styleLabelElement = tv({
  base: 'relative inline-flex cursor-pointer items-center',
});

export const styleInputElement = tv({
  base: 'peer sr-only',
});
