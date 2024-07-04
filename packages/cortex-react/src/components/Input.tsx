import {
  input,
  InputBaseVariants,
  inputBox,
  labelStyle,
} from '@tecsinapse/cortex-core';
import { clsx } from 'clsx';
import React from 'react';

const getValidChildren = (children: React.ReactNode) => {
  return React.Children.toArray(children).filter(el =>
    React.isValidElement(el)
  ) as React.ReactElement[];
};

export interface InputPropsBase {
  variants?: InputBaseVariants;
  label?: string;
}

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    InputPropsBase {}

export const InputBox = React.forwardRef<HTMLInputElement, InputProps>(
  ({ id, name, variants, label, placeholder, className, ...rest }, ref) => {
    return (
      <div className={'flex w-full flex-col'}>
        <input
          id={id ?? name}
          name={name}
          placeholder={placeholder ?? ' '}
          className={clsx(inputBox(placeholder, label, className))}
          {...rest}
          ref={ref}
          data-testid="input-input"
        />
        <label
          htmlFor={id ?? name}
          className={labelStyle({ intent: variants?.intent, placeholder })}
          data-testid="input-label"
        >
          {label}
        </label>
      </div>
    );
  }
);

type DivBaseProps = React.HTMLAttributes<HTMLDivElement>;
type InputFaceProps = DivBaseProps & Pick<InputPropsBase, 'variants'>;

export const InputFace = React.forwardRef<HTMLDivElement, InputFaceProps>(
  ({ children, variants, className, ...rest }, ref) => {
    const clones = getValidChildren(children).map(el => {
      return React.cloneElement(el, { ...el.props, variants });
    });
    return (
      <div
        {...rest}
        className={clsx(input(variants), className)}
        id={'input-face'}
        ref={ref}
      >
        {clones}
      </div>
    );
  }
);

export const InputRoot = React.forwardRef<HTMLInputElement, InputProps>(
  ({ variants, className, ...rest }, ref) => {
    return (
      <InputFace variants={variants} className={className}>
        <InputBox {...rest} ref={ref} />
      </InputFace>
    );
  }
);

type InputElementsProps = DivBaseProps & {
  children: React.ReactNode;
  className?: string;
};

export const InputLeft = React.forwardRef<HTMLDivElement, InputElementsProps>(
  ({ children, className, ...rest }, ref) => {
    return (
      <div className={clsx(className, 'mr-2.5')} {...rest} ref={ref}>
        {children}
      </div>
    );
  }
);

export const InputRight = React.forwardRef<HTMLDivElement, InputElementsProps>(
  ({ children, className, ...rest }, ref) => {
    return (
      <div className={clsx(className, 'ml-2.5')} {...rest} ref={ref}>
        {children}
      </div>
    );
  }
);

export const Input = {
  Root: InputRoot,
  Face: InputFace,
  Box: InputBox,
  Left: InputLeft,
  Right: InputRight,
};
