import React, { ReactNode } from 'react';
import { Placement } from '@floating-ui/react';

import { useFloatingLogic } from '../../hooks';
import { Context } from './Context';

interface PopoverProviderProps {
  children: ReactNode;
  placement?: Placement;
  trigger?: 'hover' | 'click';
}

export const PopoverProvider = ({
  children,
  placement,
  trigger,
}: PopoverProviderProps) => {
  const floatingLogic = useFloatingLogic({ placement, trigger });

  return (
    <Context.Provider value={{ ...floatingLogic }}>{children}</Context.Provider>
  );
};
