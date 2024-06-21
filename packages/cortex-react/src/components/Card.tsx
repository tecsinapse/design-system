import { card } from '@tecsinapse/cortex-core';
import React, { forwardRef, HTMLProps } from 'react';

interface CardProps {
  children?: React.ReactNode;
}
export const Card = forwardRef<
  HTMLDivElement,
  CardProps & HTMLProps<HTMLDivElement>
>((props, ref) => {
  const { children, className, ...rest } = props;
  return (
    <div className={card({ className })} ref={ref} {...rest}>
      {children}
    </div>
  );
});
