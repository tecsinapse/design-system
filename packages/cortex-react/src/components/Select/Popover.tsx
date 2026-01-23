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
        className="bg-surface-overlay max-h-[30vh] overflow-y-auto gap-y-mili flex flex-col p-0"
        style={{
          width: triggerWidth ? `${triggerWidth}px` : 'auto',
          zIndex: 9999,
        }}
      >
        {children}
      </Popover.Content>
    </FloatingPortal>
  );
};
