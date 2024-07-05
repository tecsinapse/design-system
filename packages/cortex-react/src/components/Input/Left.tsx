import clsx from 'clsx';
import React from 'react';
import { InputLeftProps } from './types';

export const InputLeft = React.forwardRef<HTMLDivElement, InputLeftProps>(
  ({ children, className, ...rest }, ref) => {
    return (
      <div className={clsx(className, 'mr-2.5')} {...rest} ref={ref}>
        {children}
      </div>
    );
  }
);
