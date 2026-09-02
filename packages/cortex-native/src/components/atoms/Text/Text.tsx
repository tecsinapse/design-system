import React from 'react';
import { Text as RNText, type StyleProp, type TextStyle } from 'react-native';
import { cn } from '@tecsinapse/cortex-core';
import { getLabel } from './functions';
import {
  colorToneStyles,
  fontColorStyles,
  textStyles,
  type ColorGradationType,
  type ColorType,
  type FontColorType,
} from './styled';

export interface TextProps {
  /** Font theme text color */
  fontColor?: FontColorType;
  /** Font theme weight */
  fontWeight?: 'thin' | 'light' | 'regular' | 'medium' | 'semibold' | 'bold' | 'extrabold' | 'black';
  /** Font theme sizes */
  typography?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'base' | 'sub' | 'label';
  /** Font theme stack */
  fontStack?: 'default' | 'mono';
  /** Palette theme colors. You can specify this prop to override theme fontColor */
  colorVariant?: ColorType;
  /** Palette theme colors gradation */
  colorTone?: ColorGradationType;
  numberOfLines?: number;
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
  textTransform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
  capitalFirst?: boolean;
  style?: StyleProp<TextStyle>;
  className?: string;
  children?: React.ReactNode;
  testID?: string;
}

const Text: React.FC<TextProps> = ({
  children,
  style,
  fontColor = 'high',
  colorVariant,
  colorTone,
  capitalFirst = false,
  typography,
  fontWeight,
  fontStack,
  textTransform,
  className,
  ...rnProps
}) => {
  const hasColorTone = !!colorVariant && !!colorTone;
  const textClassName = cn(
    textStyles({
      typography,
      fontWeight,
      fontStack,
      colorVariant: hasColorTone ? undefined : colorVariant,
    }),
    !colorVariant && fontColorStyles[fontColor],
    colorVariant && colorTone && colorToneStyles[colorVariant][colorTone],
    className,
  );

  return (
    <RNText
      className={textClassName}
      style={[textTransform ? { textTransform } : null, style]}
      {...rnProps}
    >
      {getLabel(children, capitalFirst)}
    </RNText>
  );
};

export default Text;
