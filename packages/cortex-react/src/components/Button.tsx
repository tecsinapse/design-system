import { button, ButtonVariants } from '@tecsinapse/cortex-core';
import React from 'react';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * all `button` styles as object
   */
  variants?: ButtonVariants;
  /**
   * `button` colors
   *
   * Useful when you don't want to provide the entire variants object.
   *
   * **NOTE**: The `variants` property will always take precedence.
   */
  intent?: ButtonVariants['intent'];
  /**
   * `button` "filling"
   *
   * Useful when you don't want to provide the entire variants object.
   *
   * **NOTE**: The `variants` property will always take precedence.
   */
  variant?: ButtonVariants['variant'];
  /**
   * `button` predefined sizes
   *
   * The `base` size removes all styles related to spacing, margins and w/h
   *
   * Useful when you don't want to provide the entire variants object.
   *
   * **NOTE**: The `variants` property will always take precedence.
   */
  size?: ButtonVariants['size'];
  /** children content */
  children?: React.ReactNode;
  /** React ref */
  ref?: React.Ref<HTMLButtonElement>;
}

/** Button component */
export const Button = (props: ButtonProps) => {
  const { variants, intent, variant, size, children, className, ref, ...rest } =
    props;
  return (
    <button
      {...rest}
      className={button({ intent, variant, size, ...variants, className })}
      ref={ref}
    >
      {children}
    </button>
  );
};
