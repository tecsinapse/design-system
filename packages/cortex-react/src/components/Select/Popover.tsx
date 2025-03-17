import React, { useContext } from 'react';
import clsx from 'clsx';
import { Popover } from '../Popover';
import { SelectPopoverProps } from './types';
import { FloatingPortal } from '@floating-ui/react';
import { SelectContext } from './context';

export const SelectPopover = ({ children }: SelectPopoverProps) => {
  const { triggerWidth } = useContext(SelectContext);
  const widthClass = triggerWidth ? `w-[${triggerWidth}px]` : 'w-auto';

  return (
    <FloatingPortal>
      <Popover.Content
        className={clsx(
          'bg-white max-h-[30vh] overflow-y-scroll gap-y-mili flex flex-col p-0',
          widthClass
        )}
      >
        {children}
      </Popover.Content>
    </FloatingPortal>
  );
};
