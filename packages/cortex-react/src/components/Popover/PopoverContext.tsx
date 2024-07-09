import React, { createContext, useContext, ReactNode, useState } from 'react';
import { Placement } from '@floating-ui/react';
import { useFloatingLogic } from '../../hooks';

interface PopoverContextProps {
  triggerProps?: any;
  refs?: any;
  isOpen?: boolean;
  x?: number;
  y?: number;
  strategy?: 'absolute' | 'fixed';
  floatingStyles?: React.CSSProperties;
  placement?: Placement;
  setPlacement?: React.Dispatch<React.SetStateAction<Placement | undefined>>;
  setTrigger?: React.Dispatch<React.SetStateAction<'hover' | 'click'>>;
}

const PopoverContext = createContext<PopoverContextProps | undefined>(
  undefined
);

export const usePopoverContext = () => {
  const context = useContext(PopoverContext);
  if (!context) {
    throw new Error('usePopoverContext must be used within a PopoverProvider');
  }
  return context;
};

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
    <PopoverContext.Provider value={{ ...floatingLogic }}>
      {children}
    </PopoverContext.Provider>
  );
};
