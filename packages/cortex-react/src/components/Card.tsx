import { card, CardVariants } from '@tecsinapse/cortex-core';
import React, { HTMLAttributes, KeyboardEvent } from 'react';

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
  const { children, className, ref, variants, onKeyDown, ...rest } = props;
  const selectable = variants?.selectable;

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event);
    if (!selectable || (event.key !== 'Enter' && event.key !== ' ')) {
      return;
    }
    event.preventDefault();
    event.currentTarget.click();
  };

  return (
    <div
      className={card({ ...variants, className })}
      ref={ref}
      role={selectable ? 'button' : undefined}
      tabIndex={selectable ? 0 : undefined}
      aria-pressed={selectable ? variants?.isSelected ?? false : undefined}
      onKeyDown={handleKeyDown}
      {...rest}
    >
      {children}
    </div>
  );
};
