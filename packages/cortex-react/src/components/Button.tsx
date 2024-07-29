import { button, ButtonVariants } from '@tecsinapse/cortex-core';
import React, { forwardRef } from 'react';

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  variants?: ButtonVariants;
  /** child element */
  children?: React.ReactNode;
}

/** Button component */
export const Button = forwardRef<
  HTMLButtonElement,
  ButtonProps & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className'>
>((props: ButtonProps, ref) => {
  const { variants, children, ...rest } = props;
  return (
    <button
      className={button(variants)}
      ref={ref}
      data-testid="button"
      {...rest}
    >
      {children}
    </button>
  );
});
