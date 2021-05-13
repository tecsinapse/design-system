import React, { FC } from 'react';
import { BadgeStyle } from './styled';
import { StyleProp, ViewStyle } from 'react-native';
import {
  BorderRadiusType,
  ColorScale,
  ColorType,
} from '@tecsinapse/react-core';

export interface BadgeProps {
  children?: JSX.Element;
  color: ColorType;
  tone?: ColorScale;
  variant?: BorderRadiusType;
  style?: StyleProp<ViewStyle>;
}

const Badge: FC<BadgeProps> = ({
  children,
  style,
  color = 'primary',
  tone = 'medium',
  variant = 'pill',
}): JSX.Element => {
  return (
    <BadgeStyle style={style} color={color} tone={tone} variant={variant}>
      {children}
    </BadgeStyle>
  );
};

export default Badge;
