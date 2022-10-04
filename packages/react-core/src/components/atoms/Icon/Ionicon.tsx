import React from 'react';
import IonRNVI from 'react-native-vector-icons/dist/Ionicons';
import { getStyledIcon } from './functions';
import { IconInternalProps } from './types';

const Ionicon = ({ size, color, name, ...rest }: IconInternalProps) => {
  const Icon = getStyledIcon(IonRNVI, size);
  return <Icon {...rest} name={name} color={color} />;
};

export default Ionicon;
