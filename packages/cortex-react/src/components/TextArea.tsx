import React from 'react';
import {
  input,
  InputBaseVariants,
  inputBox,
  labelStyle,
} from '@tecsinapse/cortex-core';
import { clsx } from 'clsx';

const getValidChildren = (children: React.ReactNode) => {
  return React.Children.toArray(children).filter(el =>
    React.isValidElement(el)
  ) as React.ReactElement[];
};

interface TextAreaPropsBase {
  variants?: InputBaseVariants;
  label?: string;
  rows?: number;
}

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    TextAreaPropsBase {}

const Box = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    { id, name, variants, label, placeholder, rows, className, ...rest },
    ref
  ) => {
    return (
      <div className="flex w-full flex-col">
        <textarea
          ref={ref}
          id={id ?? name}
          name={name}
          placeholder={placeholder ?? ' '}
          className={clsx(
            inputBox(placeholder, label, className),
            'resize-none mt-mili'
          )}
          rows={rows}
          {...rest}
        />
        <label
          htmlFor={id ?? name}
          className={labelStyle({
            intent: variants?.intent,
            placeholder,
          })}
        >
          {label}
        </label>
      </div>
    );
  }
);

type DivBaseProps = React.HTMLAttributes<HTMLDivElement>;
type TextAreaFaceProps = DivBaseProps & Pick<TextAreaPropsBase, 'variants'>;

const Face = React.forwardRef<HTMLDivElement, TextAreaFaceProps>(
  ({ children, variants, className, ...rest }, ref) => {
    const clones = getValidChildren(children).map(el => {
      return React.cloneElement(el, { ...el.props, variants });
    });
    return (
      <div
        ref={ref}
        className={clsx(input(variants), className)}
        id="textarea-face"
        {...rest}
      >
        {clones}
      </div>
    );
  }
);

const Root = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ variants, className, ...rest }, ref) => {
    return (
      <Face variants={variants} className={className}>
        <Box ref={ref} {...rest} />
      </Face>
    );
  }
);

type TextAreaElementsProps = DivBaseProps & {
  children: React.ReactNode;
  className?: string;
};

const Left = React.forwardRef<HTMLDivElement, TextAreaElementsProps>(
  ({ children, className, ...rest }, ref) => {
    return (
      <div className={clsx(className, 'mr-2.5')} {...rest} ref={ref}>
        {children}
      </div>
    );
  }
);

const Right = React.forwardRef<HTMLDivElement, TextAreaElementsProps>(
  ({ children, className, ...rest }, ref) => {
    return (
      <div className={clsx(className, 'ml-2.5')} {...rest} ref={ref}>
        {children}
      </div>
    );
  }
);

export const TextArea = {
  Root,
  Face,
  Box,
  Left,
  Right,
};
