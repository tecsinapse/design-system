import React from 'react';
import { Popover } from '../Popover';
import { SelectPopoverProps } from './types';

export const SelectPopover = ({ children }: SelectPopoverProps) => {
  return (
    <Popover.Content className="bg-white max-h-[30vh] w-full overflow-y-scroll gap-y-mili flex flex-col p-0">
      {children}
    </Popover.Content>
  );
};
