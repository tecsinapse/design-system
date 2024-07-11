import React from 'react';

import { Placement } from '@floating-ui/react';
import { PopoverProvider } from './PopoverContext';

export interface PopoverRootProps {
  children: React.ReactNode;
  placement?: Placement;
  trigger?: 'hover' | 'click';
}

const PopoverRoot = ({ children, placement, trigger }: PopoverRootProps) => {
  return (
    <PopoverProvider placement={placement} trigger={trigger}>
      {children}
    </PopoverProvider>
  );
};

export default PopoverRoot;
