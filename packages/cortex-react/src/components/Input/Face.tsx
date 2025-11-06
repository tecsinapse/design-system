import { input } from '@tecsinapse/cortex-core';
import clsx from 'clsx';
import React from 'react';
import { InputFaceProps } from './types';

const getValidChildren = (children: React.ReactNode) => {
  return React.Children.toArray(children).filter(el =>
    React.isValidElement(el)
  ) as React.ReactElement[];
};

export const InputFace = React.forwardRef<HTMLDivElement, InputFaceProps>(
  ({ children, variants, className, ...rest }: InputFaceProps, ref) => {
    const clones = getValidChildren(children).map(el => {
      const elProps = (el.props as any) || {};
      return React.cloneElement(el, { ...elProps, variants });
    });

    return (
      <div
        data-testid={'input-face'}
        {...rest}
        className={clsx(input(variants), className)}
        ref={ref}
      >
        {clones}
      </div>
    );
  }
);
