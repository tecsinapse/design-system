import React, { useContext } from 'react';
import { Popover } from '../Popover';
import { SelectPopoverProps } from './types';
import { FloatingPortal } from '@floating-ui/react';
import { SelectContext } from './context';

export const SelectPopover = ({ children }: SelectPopoverProps) => {
  const { triggerWidth } = useContext(SelectContext);

  return (
    <FloatingPortal>
      <Popover.Content
        className={`bg-white max-h-[30vh] overflow-y-scroll gap-y-mili flex flex-col p-0 ${
          triggerWidth ? `w-[${triggerWidth}px]` : 'w-auto'
        }`}
      >
        {children}
      </Popover.Content>
    </FloatingPortal>
  );
};
