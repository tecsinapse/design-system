import { card, CardVariants } from '@tecsinapse/cortex-core';
import React, { HTMLAttributes } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** child element */
  children?: React.ReactNode;
  /** React ref */
  ref?: React.Ref<HTMLDivElement>;
  /**
   * all `card` styles as object
   */
  variants?: CardVariants;
}

/** Card component */
export const Card = (props: CardProps) => {
  const { children, className, ref, variants, ...rest } = props;
  return (
    <div className={card({ ...variants, className })} ref={ref} {...rest}>
      {children}
    </div>
  );
};
