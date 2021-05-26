import React, { FC } from 'react';
import { StyleProp, TextStyle } from 'react-native';
import { IconSizeType, IconType } from '@tecsinapse/react-core';
import { getIconComponent } from './helpers';

export interface IconProps {
  name: string;
  color?: string;
  size?: IconSizeType;
  type: IconType;
  style?: StyleProp<TextStyle>;
}

const Icon: FC<IconProps> = ({
  name,
  size = 'centi',
  type,
  style,
  color = '#000',
  ...rest
}) => {
  const RNVIcon = getIconComponent(type, size);

  return <RNVIcon {...rest} style={style} name={name} color={color} />;
};

export default Icon;
