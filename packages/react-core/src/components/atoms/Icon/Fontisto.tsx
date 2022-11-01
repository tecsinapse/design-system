import React from 'react';
import FontistoRNVI from 'react-native-vector-icons/dist/Fontisto';
import { getStyledIcon } from './styled';
import { IconInternalProps } from './types';

const Fontisto = ({ size, color, name, ...rest }: IconInternalProps) => {
  const Icon = getStyledIcon(FontistoRNVI, size);
  return <Icon {...rest} name={name} color={color} />;
};

export default Fontisto;
