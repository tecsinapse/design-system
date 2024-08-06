import React from 'react';

import { Placement } from '@floating-ui/react';
import { PopoverProvider } from './Provider';

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
    <PopoverProvider placement={placement} trigger={trigger}>
      {children}
    </PopoverProvider>
  );
};
