import { card } from '@tecsinapse/cortex-core';
import React, { HTMLAttributes } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** child element */
  children?: React.ReactNode;
  /** React ref */
  ref?: React.Ref<HTMLDivElement>;
}

/** Card component */
export const Card = (props: CardProps) => {
  const { children, className, ref, ...rest } = props;
  return (
    <div className={card({ className })} ref={ref} {...rest}>
      {children}
    </div>
  );
};
