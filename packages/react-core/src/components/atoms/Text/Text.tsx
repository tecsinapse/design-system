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
  fontColor?: FontColorType;
  fontWeight?: FontWeightType;
  typography?: TypographyVariationType;
  fontStack?: FontStackType;
  colorVariant?: ColorType;
  colorTone?: ColorGradationType;
  style?: StyleProp<TextStyle>;
}

/** NOTE: When using colors, be careful to not override fontColor by using colorVariant and colorTone, referent to theme colors and not text colors. */
const Text: FC<TextProps> = ({
  children,
  style,
  fontColor = 'dark',
  colorTone = 'medium',
  colorVariant,
  fontWeight = 'regular',
  typography = 'base',
  ...rest
}): JSX.Element => {
  return (
    <StyledColoredText
      {...rest}
      style={style}
      fontColor={fontColor}
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
