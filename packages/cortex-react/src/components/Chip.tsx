import React, { ButtonHTMLAttributes } from 'react';
import { chip } from '@tecsinapse/cortex-core';

export interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** child element */
  children?: React.ReactNode;
  /** React ref */
  ref?: React.Ref<HTMLButtonElement>;
  /** applies the selected background/text color */
  isSelected?: boolean;
  onSelect?: () => void;
}

/** Chip component */
export const Chip = (props: ChipProps) => {
  const { children, className, ref, isSelected, onSelect, ...rest } = props;
  return (
    <button
      type="button"
      className={chip({ isSelected, className })}
      aria-pressed={isSelected}
      onClick={onSelect}
      ref={ref}
      {...rest}
    >
      {children}
    </button>
  );
};
