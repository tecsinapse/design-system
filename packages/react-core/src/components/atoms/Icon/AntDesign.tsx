import React from 'react';
import AntDesignRNVI from 'react-native-vector-icons/dist/AntDesign';
import { getStyledIcon } from './styled';
import { IconInternalProps } from './types';

const AntDesign = ({ size, color, name, ...rest }: IconInternalProps) => {
  const Icon = getStyledIcon(AntDesignRNVI, size);
  return <Icon {...rest} name={name} color={color} />;
};

export default AntDesign;
