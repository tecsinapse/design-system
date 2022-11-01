import React from 'react';
import FontAwesomeFiveRNVI from 'react-native-vector-icons/dist/FontAwesome5';
import { getStyledIcon } from './styled';
import { IconInternalProps } from './types';

const FontAwesomeFive = ({ size, color, name, ...rest }: IconInternalProps) => {
  const Icon = getStyledIcon(FontAwesomeFiveRNVI, size);
  return <Icon {...rest} name={name} color={color} />;
};

export default FontAwesomeFive;
