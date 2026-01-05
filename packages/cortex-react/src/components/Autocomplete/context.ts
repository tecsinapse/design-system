import { createContext, Dispatch, SetStateAction } from 'react';

interface AutocompleteContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerWidth: number | undefined;
  setTriggerWidth: Dispatch<SetStateAction<number | undefined>>;
}

export const AutocompleteContext = createContext<AutocompleteContextType | undefined>(
  undefined
);

