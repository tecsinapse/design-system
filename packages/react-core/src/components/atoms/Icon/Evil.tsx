import React from 'react';
import EvilRNVI from 'react-native-vector-icons/dist/EvilIcons';
import { getStyledIcon } from './functions';
import { IconInternalProps } from './types';

const Evil = ({ size, color, name, ...rest }: IconInternalProps) => {
  const Icon = getStyledIcon(EvilRNVI, size);
  return <Icon {...rest} name={name} color={color} />;
};

export default Evil;
