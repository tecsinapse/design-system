import React, { FC } from 'react';
import { Text } from 'react-native';

export interface NativeFlagIconProps {
  countryCode: string;
  dialCode?: string;
}

const FLAG_SIZE = 25;

const CountryFlagModule = (() => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    return require('react-native-country-flag').default as React.ComponentType<{
      isoCode: string;
      size: number;
    }>;
  } catch {
    return null;
  }
})();

export const FlagIcon: FC<NativeFlagIconProps> = ({ countryCode, dialCode }) => {
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
