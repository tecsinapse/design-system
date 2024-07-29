import React, { forwardRef } from 'react';
import { button, ButtonVariants } from '@tecsinapse/cortex-core';

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  variants?: ButtonVariants;
  children?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
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
  }
);
