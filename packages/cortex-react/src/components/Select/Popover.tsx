import React, { useContext } from 'react';
import { Popover } from '../Popover';
import { SelectPopoverProps } from './types';
import { FloatingPortal } from '@floating-ui/react';
import { SelectContext } from './context';
import { useResolvedPortalRoot } from '../../provider';

export const SelectPopover = ({ children, root }: SelectPopoverProps) => {
  const { triggerWidth } = useContext(SelectContext);
  const portalRoot = useResolvedPortalRoot(root);

  return (
    <FloatingPortal root={portalRoot}>
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
