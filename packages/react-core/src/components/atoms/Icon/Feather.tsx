import React from 'react';
import FeatherRNVI from 'react-native-vector-icons/dist/Feather';
import { getStyledIcon } from './styled';
import { IconInternalProps } from './types';

const Feather = ({ size, color, name, ...rest }: IconInternalProps) => {
  const Icon = getStyledIcon(FeatherRNVI, size);
  return <Icon {...rest} name={name} color={color} />;
};

export default Feather;
