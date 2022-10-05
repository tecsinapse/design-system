import React from 'react';
import FontAwesomeRNVI from 'react-native-vector-icons/dist/FontAwesome';
import { getStyledIcon } from './functions';
import { IconInternalProps } from './types';

const FontAwesome = ({ size, color, name, ...rest }: IconInternalProps) => {
  const Icon = getStyledIcon(FontAwesomeRNVI, size);
  return <Icon {...rest} name={name} color={color} />;
};

export default FontAwesome;
