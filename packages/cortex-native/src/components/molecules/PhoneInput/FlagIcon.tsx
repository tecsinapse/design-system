import React from 'react';
import { Text } from 'react-native';
import CountryFlag from 'react-native-country-flag';

export interface FlagIconProps {
  countryCode: string;
  dialCode?: string;
}

const FLAG_SIZE = 25;

export const FlagIcon: React.FC<FlagIconProps> = ({
  countryCode,
  dialCode,
}) => {
  if (!countryCode) {
    return null;
  }

  if (CountryFlag) {
    return <CountryFlag isoCode={countryCode.toLowerCase()} size={FLAG_SIZE} />;
  }

  return (
    <Text style={{ fontSize: 12, fontWeight: '600' }}>
      {dialCode ? `+${dialCode}` : countryCode.toUpperCase()}
    </Text>
  );
};
