import React, { forwardRef } from 'react';
import { button, ButtonVariants } from '@tecsinapse/cortex-core';

interface ButtonProps {
  variants?: ButtonVariants;
  children?: React.ReactNode;
}

export const Button = forwardRef<
  HTMLButtonElement,
  ButtonProps & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className'>
>((props, ref) => {
  const { variants, children, ...rest } = props;
  return (
    <button className={button(variants)} ref={ref} {...rest}>
      {children}
    </button>
  );
});
