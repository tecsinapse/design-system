import React, { createContext, ReactNode, useContext } from 'react';
import { Toaster, type ExternalToast } from 'sonner';
import { SnackbarSonner } from '../service/SnackbarSonner';

interface SnackbarProviderProps {
  snackbar: SnackbarSonner;
}
const SnackbarContext = createContext<SnackbarProviderProps | null>(null);

export const SnackbarProvider = ({
  children,
  options,
}: {
  children: ReactNode;
  options?: ExternalToast;
}) => {
  const snackbar = new SnackbarSonner(options);
  return (
    <SnackbarContext.Provider value={{ snackbar }}>
      {children}
      <Toaster />
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);

  if (!context) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context;
};
