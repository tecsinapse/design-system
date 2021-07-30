import {BadgeProps, Badge as BadgeCore, FontColorType} from '@tecsinapse/react-core';
import {Text} from '../Text';
import React, { FC } from 'react';

export interface BadgeNativeProps extends Omit<BadgeProps, 'value'> {
  fontColor?: FontColorType;
  value: string | number;
}

const Badge: FC<BadgeNativeProps> = ({children, fontColor = 'light', value, ...props}) => {
  return <BadgeCore {...props} value={<Text fontColor={fontColor} fontWeight={'bold'} typography={'label'}>{value}</Text>}>
    {children}
  </BadgeCore>;
};

export default Badge;