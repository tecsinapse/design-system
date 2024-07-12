import { createContext } from 'react';

interface SelectContextProps<T> {
  value?: T;
  keyExtractor: (value: T) => string;
  labelExtractor: (value: T) => string;
}

export const SelectContext = createContext<SelectContextProps<any>>({
  keyExtractor: () => '',
  labelExtractor: () => '',
});
