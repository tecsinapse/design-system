import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useRef,
} from 'react';
import { useOutsideClickListener } from '../hooks';

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
  const ref = useRef(null);

  const onClickOutside = useCallback(() => {
    setShow(false);
  }, []);

  useOutsideClickListener({
    ref,
    onClickOutside,
  });

  return (
    <MenubarContext.Provider value={{ show, setShow }}>
      <div ref={ref}>{children}</div>
    </MenubarContext.Provider>
  );
};

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
