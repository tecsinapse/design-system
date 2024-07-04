import { selectVariants } from '@tecsinapse/cortex-core';
import React, { ReactNode, useContext } from 'react';
import { SelectContext } from './context';

export interface SelectPopoverProps {
  children: ReactNode;
}

const { dropdown } = selectVariants();

export const SelectPopover = ({ children }: SelectPopoverProps) => {
  const { open } = useContext(SelectContext);

  return (
    <div className={dropdown({ open })} data-testid={'select-popover'}>
      {children}
    </div>
  );
};
