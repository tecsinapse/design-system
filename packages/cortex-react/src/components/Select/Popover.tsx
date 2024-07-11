import React, { ReactNode, useContext } from 'react';
import { Popover } from '../Popover/Popover';
import { SelectContext } from './context';
export interface SelectPopoverProps {
  children: ReactNode;
}

export const SelectPopover = ({ children }: SelectPopoverProps) => {
  const { open } = useContext(SelectContext);

  return (
    <Popover.Content
      open={open}
      className="bg-white max-h-[30vh] w-full overflow-y-scroll"
    >
      {children}
    </Popover.Content>
  );
};
