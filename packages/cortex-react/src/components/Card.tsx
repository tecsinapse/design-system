import { card } from '@tecsinapse/cortex-core';
import React, { forwardRef, HTMLAttributes } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}
export const Card = forwardRef<
  HTMLDivElement,
  CardProps & HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  const { children, className, ...rest } = props;
  return (
    <div className={card({ className })} ref={ref} {...rest}>
      {children}
    </div>
  );
});
