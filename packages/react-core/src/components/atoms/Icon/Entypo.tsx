import React from 'react';
import EntypoRNVI from 'react-native-vector-icons/dist/Entypo';
import { getStyledIcon } from './functions';
import { IconInternalProps } from './types';

const Entypo = ({ size, color, name, ...rest }: IconInternalProps) => {
  const Icon = getStyledIcon(EntypoRNVI, size);
  return <Icon {...rest} name={name} color={color} />;
};

export default Entypo;
