import { ParsedCountry, UsePhoneInputConfig } from 'react-international-phone';
import { InputPropsBase } from '../Input';
import { ReactNode } from 'react';

export interface PhoneInputTriggerProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    InputPropsBase {}

export interface PhoneInputRootProps
  extends Omit<UsePhoneInputConfig, 'onChange'> {
  children: ReactNode;
  className?: string;
  onChange?: (
    value: string,
    rest: { inputValue: string; country: ParsedCountry }
  ) => void;
}
