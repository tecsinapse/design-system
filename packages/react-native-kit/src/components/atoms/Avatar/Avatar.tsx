import { Avatar as AvatarCore, AvatarProps } from '@tecsinapse/react-core';
import React from 'react';
import { Text } from '../Text';

export const Avatar: React.FC<AvatarProps> = props => {
  return <AvatarCore {...props} TextComponent={Text} />;
};
