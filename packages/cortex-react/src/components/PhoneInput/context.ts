import { createContext, useContext } from 'react';

export interface Country {
  country: string;
  iso: string;
  code: string;
}

interface PhoneInputContextProps {
  triggerWidth?: number;
  setTriggerWidth?: (width: number) => void;
  isOpen?: boolean;
  setIsOpen?: (isOpen: boolean) => void;
  country?: Country | null;
  setCountry?: (country: Country | null) => void;
}

export const PhoneInputContext = createContext<PhoneInputContextProps>({});

export const usePhoneInput = () => {
  const context = useContext(PhoneInputContext);
  if (!context) {
    throw new Error(
      'usePhoneInputContext must be used within a usePhoneInputProvider'
    );
  }
  return context;
};
