import React, { createContext, useContext, ReactNode, useState } from 'react';
import { Placement } from '@floating-ui/react';
import { useFloatingLogic } from '../../hooks';

interface PopoverContextProps {
  triggerProps?: any;
  refs?: any;
  isOpen?: boolean;
  x?: number | null;
  y?: number | null;
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
}

export const PopoverProvider = ({ children }: PopoverProviderProps) => {
  const [placement, setPlacement] = useState<Placement | undefined>('bottom');
  const [trigger, setTrigger] = useState<'hover' | 'click'>('click');
  const floatingLogic = useFloatingLogic({ placement, trigger });

  return (
    <PopoverContext.Provider
      value={{ ...floatingLogic, setPlacement, setTrigger }}
    >
      {children}
    </PopoverContext.Provider>
  );
};
