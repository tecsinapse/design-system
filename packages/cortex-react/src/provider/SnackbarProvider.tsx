import React, { createContext, ReactNode, useContext } from 'react';
import { SnackbarSonner } from '../service';
import { Toaster } from 'sonner';

interface SnackbarProviderProps {
  snackbar: SnackbarSonner;
}
const SnackbarContext = createContext<SnackbarProviderProps | null>(null);
export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
  const snackbar = new SnackbarSonner();
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
