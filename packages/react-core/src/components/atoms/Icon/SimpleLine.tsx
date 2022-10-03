import React from 'react';
import MaterialCommunityRNVI from 'react-native-vector-icons/dist/SimpleLineIcons';
import { getStyledIcon } from './functions';
import { IconInternalProps } from './types';

const SimpleLine = ({ size, color, name, ...rest }: IconInternalProps) => {
  const Icon = getStyledIcon(MaterialCommunityRNVI, size);
  return <Icon {...rest} name={name} color={color} />;
};

export default SimpleLine;
