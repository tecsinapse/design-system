import React from 'react';
import { Text, View, ViewProps } from 'react-native';
import CountryFlag from 'react-native-country-flag';
import { cn } from '@tecsinapse/cortex-core';

export interface FlagIconProps extends ViewProps {
  countryCode: string;
  dialCode?: string;
}

const FLAG_SIZE = 25;

export const FlagIcon: React.FC<FlagIconProps> = ({
  countryCode,
  dialCode,
  className,
  testID,
  style,
  ...rest
}) => {
  if (!countryCode) {
    return null;
  }

  if (CountryFlag) {
    return (
      <View {...rest} testID={testID} className={cn(className)} style={style}>
        <CountryFlag isoCode={countryCode.toLowerCase()} size={FLAG_SIZE} />
      </View>
    );
  }

  return (
    <Text
      testID={testID}
      className={cn(className)}
      style={[{ fontSize: 12, fontWeight: '600' }, style]}
    >
      {dialCode ? `+${dialCode}` : countryCode.toUpperCase()}
    </Text>
  );
};
