import {
  ColorGradationType,
  ColorType,
  FontColorType,
  FontStackType,
  FontWeightType,
  TypographyVariationType,
} from '@tecsinapse/react-core';
import React, { FC } from 'react';
import { StyleProp, TextStyle } from 'react-native';
import { StyledColoredText } from './styled';

export interface TextProps {
  style?: StyleProp<TextStyle>;
  color?: ColorType;
  colorTone?: ColorGradationType;
  colorVariant?: FontColorType;
  fontWeight?: FontWeightType;
  typography?: TypographyVariationType;
  fontStack?: FontStackType;
}

const Text: FC<TextProps> = ({
  children,
  style,
  colorTone = 'medium',
  colorVariant = 'dark',
  fontWeight = 'regular',
  typography = 'base',
  ...rest
}): JSX.Element => {
  return (
    <StyledColoredText
      {...rest}
      style={style}
      colorTone={colorTone}
      colorVariant={colorVariant}
      fontWeight={fontWeight}
      typography={typography}
    >
      {children}
    </StyledColoredText>
  );
};

export default Text;
