import React, { FC } from 'react';
import {
  ColorGradationType,
  ColorType,
  FontColorType,
  FontStackType,
  FontWeightType,
  TypographyVariationType,
} from '@tecsinapse/react-core';
import { StyleProp, TextStyle } from 'react-native';
import { StyledColoredText } from './styled';

export interface TextProps {
  /** Font theme text color */
  fontColor?: FontColorType;
  /** Font theme weight */
  fontWeight?: FontWeightType;
  /** Font theme sizes */
  typography?: TypographyVariationType;
  /** Font theme stack */
  fontStack?: FontStackType;
  /** Palette theme colors. You can specify this prop to override theme fontColor */
  colorVariant?: ColorType;
  /** Palette theme colors gradation */
  colorTone?: ColorGradationType;
  numberOfLines?: number;
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
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
  numberOfLines,
  ellipsizeMode,
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
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
    >
      {children}
    </StyledColoredText>
  );
};

export default Text;
