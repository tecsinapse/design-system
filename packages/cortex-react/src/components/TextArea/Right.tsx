import clsx from 'clsx';
import React from 'react';
import { TextAreaElementsProps } from './types';

export const TextAreaRight = React.forwardRef<
  HTMLDivElement,
  TextAreaElementsProps
>(({ children, className, ...rest }: TextAreaElementsProps, ref) => {
  return (
    <div className={clsx(className, 'ml-2.5')} {...rest} ref={ref}>
      {children}
    </div>
  );
});
