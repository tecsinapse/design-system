import React, { FC } from 'react';
import { PressableSurface } from '../../atoms/PressableSurface';
import { Text, TextProps } from '../../atoms/Text';
import { CountryOptionProps } from './types';
import { StyledCountryOption, StyledDialCode } from './styled';

const CountryOption: FC<CountryOptionProps> = ({
  country,
  onPress,
  disabled = false,
  TextComponent = Text,
}) => {
  return (
    <StyledCountryOption
      onPress={() => onPress(country)}
      disabled={disabled}
      effect="darken"
    >
      <TextComponent typography="base" fontWeight="bold" numberOfLines={1}>
        {country.name}
      </TextComponent>
      <StyledDialCode>
        <TextComponent
          typography="label"
          colorVariant="secondary"
          colorTone="medium"
        >
          +{country.dialCode}
        </TextComponent>
      </StyledDialCode>
    </StyledCountryOption>
  );
};

export default CountryOption;
