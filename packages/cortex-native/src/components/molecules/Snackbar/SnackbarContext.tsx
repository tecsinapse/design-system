import { createContext, useContext } from 'react';
import { ColorGradationType, ColorType } from '../../../styles/types';

export interface SnackbarContextValue {
  colorVariant: ColorType;
  colorTone: ColorGradationType;
  onDismiss: () => void;
}

export const SnackbarContext = createContext<SnackbarContextValue | undefined>(
  undefined
);

export const useSnackbarContext = (): SnackbarContextValue => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('Snackbar parts must be used within <Snackbar.Root>');
  }
  return context;
};
