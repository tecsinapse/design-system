import clsx from 'clsx';
import React from 'react';
import { TextAreaElementsProps } from './types';

export const TextAreaLeft = React.forwardRef<
  HTMLDivElement,
  TextAreaElementsProps
>(({ children, className, ...rest }: TextAreaElementsProps, ref) => {
  return (
    <div className={clsx(className, 'mr-2.5')} {...rest} ref={ref}>
      {children}
    </div>
  );
});
