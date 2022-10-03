import React from 'react';
import MaterialCommunityRNVI from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { getStyledIcon } from './helpers';
import { IconSizeType } from '@tecsinapse/react-core';
import { StyleProp, TextStyle } from 'react-native';

const MaterialCommunity = ({
  size,
  color,
  name,
  ...rest
}: {
  size: IconSizeType;
  color: string;
  name: string;
  style?: StyleProp<TextStyle>;
}) => {
  const Icon = getStyledIcon(MaterialCommunityRNVI, size);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return <Icon {...rest} name={name} color={color} />;
};

export default MaterialCommunity;
