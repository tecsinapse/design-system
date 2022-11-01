import React from 'react';
import MaterialCommunityRNVI from 'react-native-vector-icons/dist/Octicons';
import { getStyledIcon } from './styled';
import { IconInternalProps } from './types';

const Octicon = ({ size, color, name, ...rest }: IconInternalProps) => {
  const Icon = getStyledIcon(MaterialCommunityRNVI, size);
  return <Icon {...rest} name={name} color={color} />;
};

export default Octicon;
