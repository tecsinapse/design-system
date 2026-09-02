import React from 'react';
import { Text, View } from 'react-native';
import CountryFlag from 'react-native-country-flag';
import { cn } from '@tecsinapse/cortex-core';

export interface FlagIconProps {
  countryCode: string;
  dialCode?: string;
  className?: string;
  testID?: string;
}

const FLAG_SIZE = 25;

export const FlagIcon: React.FC<FlagIconProps> = ({
  countryCode,
  dialCode,
  className,
  testID,
}) => {
  if (!countryCode) {
    return null;
  }

  if (CountryFlag) {
    return (
      <View testID={testID} className={cn(className)}>
        <CountryFlag isoCode={countryCode.toLowerCase()} size={FLAG_SIZE} />
      </View>
    );
  }

  return (
    <Text
      testID={testID}
      className={cn(className)}
      style={{ fontSize: 12, fontWeight: '600' }}
    >
      {dialCode ? `+${dialCode}` : countryCode.toUpperCase()}
    </Text>
  );
};
