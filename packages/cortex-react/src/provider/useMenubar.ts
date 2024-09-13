import { useContext } from 'react';
import { MenubarContext } from './MenubarContext';

export const useMenubar = (): [
  show: boolean,
  setShow: (show: boolean) => void,
] => {
  const context = useContext(MenubarContext);

  if (!context) {
    throw new Error('useMenubar must be used within a MenubarProvider');
  }
  return [context.show, context.setShow];
};
