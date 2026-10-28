import React from 'react';
import { View, ViewProps } from 'react-native';
import type { ParsedCountry } from 'react-international-phone';
import { cn } from '@tecsinapse/cortex-core';
import PressableSurface from '../../atoms/PressableSurface/PressableSurface';
import Text from '../../atoms/Text/Text';
import { FlagIcon } from './FlagIcon';

export interface CountryOptionProps extends ViewProps {
  country: ParsedCountry;
  onPress: (country: ParsedCountry) => void;
  disabled?: boolean;
}

const CountryOption: React.FC<CountryOptionProps> = ({
  country,
  onPress,
  disabled = false,
  className,
  testID,
  style,
  ...rest
}) => {
  return (
    <PressableSurface
      {...rest}
      testID={testID}
      onPress={() => onPress(country)}
      disabled={disabled}
      effect="darken"
      className={cn(className)}
      style={[{ paddingVertical: 12, paddingHorizontal: 16, minHeight: 44 }, style]}
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center flex-shrink">
          <View className="mr-centi">
            <FlagIcon countryCode={country.iso2} />
          </View>
          <Text typography="base" fontWeight="bold" numberOfLines={1}>
            {country.name}
          </Text>
        </View>
        <Text
          typography="label"
          colorVariant="secondary"
          colorTone="medium"
        >
          +{country.dialCode}
        </Text>
      </View>
    </PressableSurface>
  );
};

export default CountryOption;
