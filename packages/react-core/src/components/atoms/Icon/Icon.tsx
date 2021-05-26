import React, { FC } from 'react';
import { StyleProp, TextStyle } from 'react-native';
import { IconSizeType, IconType } from '@tecsinapse/react-core';
import { getIconType } from './helpers';

export interface IconProps {
  name: string;
  color?: string;
  size?: IconSizeType;
  type: IconType;
  style?: StyleProp<TextStyle>;
}

const Icon: FC<IconProps> = ({
  name,
  size = 'deca',
  type = 'material',
  style,
  ...rest
}) => {
  // const color = colorProp || theme?.colors?.black;
  // const reverseColor = reverseColorProp || theme?.colors?.white;
  const RNVIcon = getIconType(type);
  // const iconSpecificStyle = getIconStyle(type, { solid, brand });

  return <RNVIcon size={30} name={name} color="#000" />;
};

export default Icon;
