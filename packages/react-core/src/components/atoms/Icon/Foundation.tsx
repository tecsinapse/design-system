import React from 'react';
import FoundationRNVI from 'react-native-vector-icons/dist/Foundation';
import { getStyledIcon } from './styled';
import { IconInternalProps } from './types';

const Foundation = ({ size, color, name, ...rest }: IconInternalProps) => {
  const Icon = getStyledIcon(FoundationRNVI, size);
  return <Icon {...rest} name={name} color={color} />;
};

export default Foundation;
