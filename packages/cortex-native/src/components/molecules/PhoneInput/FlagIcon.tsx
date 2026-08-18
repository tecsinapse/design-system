import React from 'react';
import { Text } from 'react-native';

export interface FlagIconProps {
  countryCode: string;
  dialCode?: string;
}

const FLAG_SIZE = 25;

const CountryFlagModule = (() => {
  try {
    return require('react-native-country-flag')
      .default as React.ComponentType<{ isoCode: string; size: number }>;
  } catch {
    return null;
  }
})();

export const FlagIcon: React.FC<FlagIconProps> = ({
  countryCode,
  dialCode,
}) => {
  if (!countryCode) {
    return null;
  }

  if (CountryFlagModule) {
    return (
      <CountryFlagModule isoCode={countryCode.toLowerCase()} size={FLAG_SIZE} />
    );
  }

  return (
    <Text style={{ fontSize: 12, fontWeight: '600' }}>
      {dialCode ? `+${dialCode}` : countryCode.toUpperCase()}
    </Text>
  );
};
