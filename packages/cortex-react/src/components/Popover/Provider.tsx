import { Placement } from '@floating-ui/react';
import React, { ReactNode } from 'react';

import { useFloatingElement } from '../../hooks';
import { Context } from './Context';

export interface PopoverProviderProps {
  /** child element */
  children: ReactNode;
  placement?: Placement;
  trigger?: 'hover' | 'click';
}

export const PopoverProvider = ({
  children,
  placement,
  trigger,
}: PopoverProviderProps) => {
  const floatingLogic = useFloatingElement({ placement, trigger });

  return (
    <Context.Provider value={{ ...floatingLogic }}>{children}</Context.Provider>
  );
};
