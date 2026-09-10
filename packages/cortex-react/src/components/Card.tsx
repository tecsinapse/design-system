import { card } from '@tecsinapse/cortex-core';
import React, { HTMLAttributes } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** child element */
  children?: React.ReactNode;
  /** React ref */
  ref?: React.Ref<HTMLDivElement>;
  /** applies interactive styling (cursor pointer, hover shadow) */
  selectable?: boolean;
  /** applies the selected border color; only takes effect when `selectable` is also `true` */
  isSelected?: boolean;
}

/** Card component */
export const Card = (props: CardProps) => {
  const { children, className, ref, selectable, isSelected, ...rest } = props;
  return (
    <div
      className={card({ selectable, isSelected, className })}
      ref={ref}
      {...rest}
    >
      {children}
    </div>
  );
};
