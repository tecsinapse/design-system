import React, { createContext, ReactNode, useContext } from 'react';

interface ContextProviderProps {
  show: boolean;
  setShow: (show: boolean) => void;
}

const MenubarContext = createContext<ContextProviderProps | null>({
  show: false,
  setShow: () => undefined,
});

export const MenubarProvider = ({ children }: { children: ReactNode }) => {
  const [show, setShow] = React.useState(false);
  return (
    <MenubarContext.Provider value={{ show, setShow }}>
      {children}
    </MenubarContext.Provider>
  );
};

export const useMenubar = (): [
  show: boolean,
  setShow: (show: boolean) => void,
] => {
  const context = useContext(MenubarContext);

  if (!context) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return [context.show, context.setShow];
};
