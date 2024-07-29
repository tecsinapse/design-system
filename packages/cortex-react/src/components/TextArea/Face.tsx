import { input } from '@tecsinapse/cortex-core';
import clsx from 'clsx';
import React from 'react';
import { TextAreaFaceProps } from './types';
import { getValidChildren } from './utils';

export const TextAreaFace = React.forwardRef<HTMLDivElement, TextAreaFaceProps>(
  ({ children, variants, className, ...rest }: TextAreaFaceProps, ref) => {
    const clones = getValidChildren(children).map(el => {
      return React.cloneElement(el, { ...el.props, variants });
    });
    return (
      <div
        ref={ref}
        className={clsx(input(variants), className)}
        data-testid={'textarea-face'}
        id="textarea-face"
        {...rest}
      >
        {clones}
      </div>
    );
  }
);
