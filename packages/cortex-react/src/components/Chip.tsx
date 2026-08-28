import React, { ReactNode } from 'react';
import { chip } from '@tecsinapse/cortex-core';

export const Chip = ({
  children,
  isSelected,
  onSelect,
}: {
  children: ReactNode;
  isSelected: boolean;
  onSelect: () => void;
}) => {
  return (
    <div className={chip({ isSelected })} onClick={onSelect}>
      {children}
    </div>
  );
};
