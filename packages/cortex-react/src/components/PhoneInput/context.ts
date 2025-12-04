import { createContext, useContext } from 'react';
import { usePhoneInput } from 'react-international-phone';

export interface Country {
  country: string;
  iso: string;
  code: string;
}

interface PhoneInputContextProps extends ReturnType<typeof usePhoneInput> {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  triggerWidth?: number;
  setTriggerWidth?: React.Dispatch<React.SetStateAction<number | undefined>>;
}

export const PhoneInputContext = createContext<PhoneInputContextProps | null>(
  null
);

export const usePhoneContext = () => {
  const context = useContext(PhoneInputContext);
  if (!context) {
    throw new Error(
      'usePhoneInputContext must be used within a usePhoneInputProvider'
    );
  }
  return context;
};
