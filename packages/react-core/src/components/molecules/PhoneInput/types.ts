import { FC } from 'react';
import { ParsedCountry, UsePhoneInputConfig } from 'react-international-phone';
import { TextProps } from '../../atoms/Text';

export type { ParsedCountry, UsePhoneInputConfig };

export interface CountryOptionProps {
  country: ParsedCountry;
  onPress: (country: ParsedCountry) => void;
  disabled?: boolean;
  TextComponent?: FC<TextProps>;
}

export interface PhoneCountrySearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}
