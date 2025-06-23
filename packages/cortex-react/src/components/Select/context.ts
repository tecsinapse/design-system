import { createContext } from 'react';

interface SelectContextProps<T> {
  value?: T | T[];
  keyExtractor: (value: T) => string;
  labelExtractor: (value: T) => string;
  triggerWidth?: number;
  setTriggerWidth?: (width: number) => void;
}

export const SelectContext = createContext<SelectContextProps<any>>({
  keyExtractor: () => '',
  labelExtractor: () => '',
});

interface SelectMultiOptionsContextProps<T> {
  options?: T[];
  onSelect?: (value: T[]) => void;
}

export const SelectMultiOptionsContext = createContext<
  SelectMultiOptionsContextProps<any>
>({
  onSelect: () => '',
});
