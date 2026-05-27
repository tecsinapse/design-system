import { CountryOptionProps } from '@tecsinapse/react-core';
import React, { FC } from 'react';
import { View } from 'react-native';
import { Text } from '../../atoms/Text';
import { ListItem, StyledTextItemSelect } from '../Select/styled';

export const CountryOption: FC<CountryOptionProps> = ({
  country,
  onPress,
  disabled = false,
  TextComponent = Text,
}) => {
  return (
    <ListItem
      onPress={() => onPress(country)}
      disabled={disabled}
      effect="darken"
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <StyledTextItemSelect
          typography="base"
          fontWeight="bold"
          numberOfLines={1}
        >
          {country.name}
        </StyledTextItemSelect>
        <TextComponent
          typography="label"
          colorVariant="secondary"
          colorTone="medium"
        >
          +{country.dialCode}
        </TextComponent>
      </View>
    </ListItem>
  );
};
