import { createContext, useContext } from 'react';
import { ColorGradationType, ColorType } from '../../../styles/types';

export interface SnackbarContextValue {
  colorVariant: ColorType;
  colorTone: ColorGradationType;
  /**
   * Readable foreground tone for composed icon parts (`Snackbar.Icon`,
   * `Snackbar.Action`). Distinct from `colorTone`, which is the snackbar's
   * background fill — using the background tone for icon tint renders them
   * invisible against their own background.
   */
  iconColorTone: ColorGradationType;
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
