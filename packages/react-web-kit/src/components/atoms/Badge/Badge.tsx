import {
  BadgeProps,
  Badge as BadgeCore,
  Text,
  FontColorType,
} from '@tecsinapse/react-core';
import React, { FC } from 'react';

export interface BadgeWebProps extends Omit<BadgeProps, 'value'> {
  fontColor?: FontColorType;
  value: string | number;
}

const Badge: FC<BadgeWebProps> = ({
  children,
  fontColor = 'light',
  value,
  ...props
}) => {
  return (
    <BadgeCore
      {...props}
      value={
        <Text fontColor={fontColor} fontWeight={'bold'} typography={'label'}>
          {value}
        </Text>
      }
    >
      {children}
    </BadgeCore>
  );
};

export default Badge;
