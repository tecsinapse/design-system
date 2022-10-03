import React from 'react';
import MaterialRNVI from 'react-native-vector-icons/dist/MaterialIcons';
import { getStyledIcon } from './helpers';
import { IconSizeType } from '@tecsinapse/react-core';

const Material = ({
  size,
  color,
  name,
}: {
  size: IconSizeType;
  color: string;
  name: string;
}) => {
  const Icon = getStyledIcon(MaterialRNVI, size);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return <Icon name={name} color={color} />;
};

export default Material;
