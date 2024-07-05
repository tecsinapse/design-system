import clsx from 'clsx';
import React from 'react';
import { InputRightProps } from './types';

export const InputRight = React.forwardRef<HTMLDivElement, InputRightProps>(
  ({ children, className, ...rest }, ref) => {
    return (
      <div className={clsx(className, 'ml-2.5')} {...rest} ref={ref}>
        {children}
      </div>
    );
  }
);
