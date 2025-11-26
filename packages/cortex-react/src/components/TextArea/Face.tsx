import { input } from '@tecsinapse/cortex-core';
import clsx from 'clsx';
import React from 'react';
import { TextAreaFaceProps } from './types';
import { getValidChildren } from './utils';

export const TextAreaFace = React.forwardRef<HTMLDivElement, TextAreaFaceProps>(
  ({ children, variants, className, ...rest }: TextAreaFaceProps, ref) => {
    const clones = getValidChildren(children).map(el => {
      const element = el as React.ReactElement<{ variants?: unknown }>;
      const elProps = element.props || {};
      return React.cloneElement(element, { ...elProps, variants });
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
