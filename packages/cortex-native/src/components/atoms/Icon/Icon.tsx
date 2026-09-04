import React from 'react';
import { ColorValue, type TextProps as RNTextProps } from 'react-native';
import { useCSSVariable } from 'uniwind';
import { cn } from '@tecsinapse/cortex-core';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Zocial from 'react-native-vector-icons/Zocial';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Foundation from 'react-native-vector-icons/Foundation';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {
  ICON_SIZE_PX,
  iconColorVar,
  ColorGradationType,
  ColorType,
  FontColorType,
  IconSizeType,
  IconType,
} from './utils';

interface IconComponentProps extends RNTextProps {
  name: string;
  size?: number;
  color?: ColorValue | number;
}

const getIconComponent = (
  type: IconType
): React.ComponentType<IconComponentProps> => {
  switch (type) {
    case 'zocial':
      return Zocial;
    case 'octicon':
      return Octicons;
    case 'material':
      return MaterialIcons;
    case 'material-community':
      return MaterialCommunityIcons;
    case 'ionicon':
      return Ionicons;
    case 'foundation':
      return Foundation;
    case 'evilicon':
      return EvilIcons;
    case 'entypo':
      return Entypo;
    case 'font-awesome':
      return FontAwesome;
    case 'font-awesome-5':
      return FontAwesome5;
    case 'simple-line-icon':
      return SimpleLineIcons;
    case 'feather':
      return Feather;
    case 'antdesign':
    case 'ant-design':
      return AntDesign;
    case 'fontisto':
      return Fontisto;
  }
};

export interface IconProps extends RNTextProps {
  /** Name of the icon. You must use the same icons from react-native-vector-icons */
  name: string;
  /** Icon family. You must use the same icons from react-native-vector-icons */
  type: IconType;
  /** Default icon sizes from the theme */
  size?: IconSizeType;
  /** Font theme fill color */
  fontColor?: FontColorType;
  /** Palette theme fill color */
  colorVariant?: ColorType;
  /** Palette theme gradation fill color */
  colorTone?: ColorGradationType;
}

const Icon: React.FC<IconProps> = ({
  name,
  type,
  size = 'centi',
  fontColor = 'high',
  colorVariant,
  colorTone = 'medium',
  style,
  className,
  ...rest
}) => {
  const color = useCSSVariable(
    iconColorVar(colorVariant, colorTone, fontColor)
  );
  const IconComponent = getIconComponent(type);

  return (
    <IconComponent
      {...rest}
      name={name}
      size={ICON_SIZE_PX[size]}
      color={color}
      style={style}
      className={cn(className)}
    />
  );
};

export default Icon;
