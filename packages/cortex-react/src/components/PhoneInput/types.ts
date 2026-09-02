import { ParsedCountry, UsePhoneInputConfig } from 'react-international-phone';
import { InputPropsBase } from '../Input';
import { ReactNode } from 'react';
import type { PortalRoot } from '../../provider';

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

export interface PhoneInputPopoverProps {
  children: ReactNode;
  /** Override the FloatingPortal mount node. Pass an `HTMLElement`, a
   *  `RefObject<HTMLElement>`, or `null` to opt out of any ancestor
   *  `<PortalProvider>`. When omitted, falls back to the closest
   *  `<PortalProvider>`'s root, then to `document.body`. */
  root?: PortalRoot;
}
