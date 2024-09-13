import { createContext } from 'react';

interface ContextProviderProps {
  show: boolean;
  setShow: (show: boolean) => void;
}

export const MenubarContext = createContext<ContextProviderProps | null>({
  show: false,
  setShow: () => undefined,
});
