import { createContext, useContext } from 'react';

export const Context = createContext<{
  open: boolean;
  toggle?: () => void;
}>({ open: false });

export const useAccordionContext = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error('useAccordionContext must be used within a Accordion');
  }
  return context;
};
