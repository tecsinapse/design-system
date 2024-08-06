import React from 'react';

import { Placement } from '@floating-ui/react';
import { Popover } from '.';

export interface PopoverRootProps {
  /** child element */
  children: React.ReactNode;
  placement?: Placement;
  trigger?: 'hover' | 'click';
}

/** Popover component */
export const PopoverRoot = ({
  children,
  placement,
  trigger,
}: PopoverRootProps) => {
  return (
    <Popover.Provider placement={placement} trigger={trigger}>
      {children}
    </Popover.Provider>
  );
};
