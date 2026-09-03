import { createContext, useContext } from 'react';

export type ButtonContextValue = { foregroundColor?: string };

export const ButtonContext = createContext<ButtonContextValue | null>(null);

export const useButtonContext = (): ButtonContextValue => {
  const context = useContext(ButtonContext);
  if (!context) {
    throw new Error('Button parts must be used within <Button.Root>');
  }
  return context;
};
