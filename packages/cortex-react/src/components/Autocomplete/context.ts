import { createContext, Dispatch, SetStateAction } from 'react';

export interface AutocompleteContextType<T> {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerWidth: number | undefined;
  setTriggerWidth: Dispatch<SetStateAction<number | undefined>>;
  keyExtractor: (option: T) => string;
  labelExtractor: (option: T) => string;
}

export const AutocompleteContext = createContext<
  AutocompleteContextType<any> | undefined
>(undefined);
