import React, { FC } from 'react';
import { StyledText } from './styled';
import { StyleProp, TextStyle } from 'react-native';
import {
  FontColorType,
  FontWeightType,
  TypographyTypes,
} from '@tecsinapse/react-core';

export interface TextProps {
  style?: StyleProp<TextStyle>;
  variantColor?: FontColorType;
  fontWeight?: FontWeightType;
  typography?: TypographyTypes;
}

const Text: FC<TextProps> = ({
  children,
  style,
  variantColor = 'dark',
  fontWeight = 'regular',
  typography = 'base',
}): JSX.Element => {
  return (
    <StyledText
      style={style}
      variantColor={variantColor}
      fontWeight={fontWeight}
      typography={typography}
    >
      {children}
    </StyledText>
  );
};

export default Text;
