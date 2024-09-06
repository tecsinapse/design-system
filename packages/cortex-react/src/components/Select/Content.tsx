import clsx from 'clsx';
import React, { useRef } from 'react';
import { ContentProps } from './types';

export const Content = ({ children, className }: ContentProps) => {
  const ref = useRef(null);

  return (
    <div className={clsx('w-full relative', className)} ref={ref}>
      {children}
    </div>
  );
};
