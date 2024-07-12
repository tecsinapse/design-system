import React, { createContext, useContext } from 'react';
import { Placement } from '@floating-ui/react';

interface ContextProps {
  triggerProps?: any;
  refs?: any;
  isOpen?: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  x?: number;
  y?: number;
  strategy?: 'absolute' | 'fixed';
  floatingStyles?: React.CSSProperties;
  placement?: Placement;
  setPlacement?: React.Dispatch<React.SetStateAction<Placement | undefined>>;
  setTrigger?: React.Dispatch<React.SetStateAction<'hover' | 'click'>>;
}

export const Context = createContext<ContextProps | undefined>(undefined);

export const usePopoverContext = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error('usePopoverContext must be used within a PopoverProvider');
  }
  return context;
};
