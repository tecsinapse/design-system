import React from 'react';
import MaterialRNVI from 'react-native-vector-icons/dist/MaterialIcons';
import { getStyledIcon } from './functions';
import { IconInternalProps } from './types';

const Material = ({ size, color, name, ...rest }: IconInternalProps) => {
  const Icon = getStyledIcon(MaterialRNVI, size);
  return <Icon {...rest} name={name} color={color} />;
};

export default Material;
