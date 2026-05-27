import React, { FC } from 'react';
import { Text, TextProps } from '../../atoms/Text';

export interface FlagIconProps {
  countryCode: string;
  dialCode?: string;
  TextComponent?: FC<TextProps>;
}

const FlagIcon: FC<FlagIconProps> = ({
  countryCode,
  dialCode,
  TextComponent = Text,
}) => {
  if (!countryCode) {
    return null;
  }

  if (dialCode) {
    return (
      <TextComponent typography="label" fontWeight="bold">
        +{dialCode}
      </TextComponent>
    );
  }

  return (
    <TextComponent typography="label" fontWeight="bold">
      {countryCode.toUpperCase()}
    </TextComponent>
  );
};

export default FlagIcon;
