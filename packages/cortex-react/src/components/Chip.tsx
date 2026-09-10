import React, { ButtonHTMLAttributes } from 'react';
import { chip, ChipVariants } from '@tecsinapse/cortex-core';

export interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** child element */
  children?: React.ReactNode;
  /** React ref */
  ref?: React.Ref<HTMLButtonElement>;
  /**
   * all `chip` styles as object
   */
  variants?: ChipVariants;
  onSelect?: () => void;
}

/** Chip component */
export const Chip = (props: ChipProps) => {
  const { children, className, ref, variants, onSelect, ...rest } = props;
  return (
    <button
      type="button"
      className={chip({ ...variants, className })}
      aria-pressed={variants?.isSelected}
      onClick={onSelect}
      ref={ref}
      {...rest}
    >
      {children}
    </button>
  );
};
