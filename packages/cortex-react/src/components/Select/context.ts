import { Dispatch, SetStateAction, createContext } from 'react';

interface SelectContextProps<T> {
  value?: T;
  isOpen?: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
  keyExtractor: (value: T) => string;
  labelExtractor: (value: T) => string;
}

export const SelectContext = createContext<SelectContextProps<any>>({
  keyExtractor: () => '',
  labelExtractor: () => '',
});
