import FontAwesomeRNVI from 'react-native-vector-icons/dist/FontAwesome';
import { getStyledIcon } from './helpers';
import React from 'react';
import { IconSizeType } from '@tecsinapse/react-core';

const FontAwesome = ({
  size,
  color,
  name,
}: {
  size: IconSizeType;
  color: string;
  name: string;
}) => {
  const Icon = getStyledIcon(FontAwesomeRNVI, size);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return <Icon name={name} color={color} />;
};

export default FontAwesome;
