import React, { ReactNode } from 'react';
import { Popover } from '../Popover';

export interface SelectPopoverProps {
  children: ReactNode;
}

export const SelectPopover = ({ children }: SelectPopoverProps) => {
  return (
    <Popover.Content className="bg-white max-h-[30vh] w-full overflow-y-scroll gap-y-mili flex flex-col p-0">
      {children}
    </Popover.Content>
  );
};
