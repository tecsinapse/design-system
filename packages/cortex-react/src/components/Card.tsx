import { card } from '@tecsinapse/cortex-core';
import React, { forwardRef, HTMLAttributes } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

/** Card component */
export const Card = forwardRef<
  HTMLDivElement,
  CardProps & HTMLAttributes<HTMLDivElement>
>((props: CardProps & HTMLAttributes<HTMLDivElement>, ref) => {
  const { children, className, ...rest } = props;
  return (
    <div className={card({ className })} ref={ref} {...rest}>
      {children}
    </div>
  );
});
