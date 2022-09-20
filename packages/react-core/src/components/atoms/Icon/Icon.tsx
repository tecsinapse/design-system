import React, { FC } from 'react';
import { StyleProp, TextStyle, Text } from 'react-native';
import { useTheme } from '@emotion/react';
import {
  ColorGradationType,
  ColorType,
  FontColorType,
  IconSizeType,
  IconType,
  ThemeProp,
} from '@tecsinapse/react-core';
import { getIconColor, getIconComponent } from './helpers';

export interface IconProps {
  /**  Name of the icon. You must use the same icons from react-native-vector-icons */
  name: string;
  /**  Default icon sizes from theme */
  size?: IconSizeType;
  /**  Icon family. You must use the same icons from react-native-vector-icons */
  type: IconType;
  /** Font theme fill color */
  fontColor?: FontColorType;
  /** Palette theme fill color */
  colorVariant?: ColorType;
  /** Palette theme gradation fill color */
  colorTone?: ColorGradationType;
  style?: StyleProp<TextStyle>;
}

/** NOTE: When using colors, the order matters if you're trying to merge multiple types. */
const Icon: FC<IconProps> = ({
  name,
  size = 'centi',
  type,
  style,
  fontColor = 'dark',
  colorVariant,
  colorTone = 'medium',
  ...rest
}) => {
  const theme = useTheme() as ThemeProp;
  const color = getIconColor(colorVariant, colorTone, fontColor, theme);
  const RNVIcon = getIconComponent(type, size);

  return (
    <React.Suspense fallback={<Text> </Text>}>
      <RNVIcon {...rest} style={style} name={name} color={color} />
    </React.Suspense>
  );
};

export default Icon;
