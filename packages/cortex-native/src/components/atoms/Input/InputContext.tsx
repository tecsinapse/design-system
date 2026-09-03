import { createContext, useContext } from 'react';

import type { InputVariantType } from './InputContainer';

export type InputContextValue = {
  focused: boolean;
  disabled?: boolean;
  variant: InputVariantType;
};

export const InputContext = createContext<InputContextValue | null>(null);

export const useInputContext = (): InputContextValue => {
  const context = useContext(InputContext);
  if (!context) {
    throw new Error(
      'Input parts must be used within <Input.Root> or <Input.Face>'
    );
  }
  return context;
};
