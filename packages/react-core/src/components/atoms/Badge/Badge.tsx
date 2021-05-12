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
  borderRadius: BorderRadiusType;
  style?: StyleProp<ViewStyle>;
}

const Badge: FC<BadgeProps> = ({
  children,
  color,
  style,
  tone,
  borderRadius,
}): JSX.Element => {
  return (
    <BadgeStyle
      style={style}
      color={color}
      tone={tone}
      borderRadius={borderRadius}
    >
      {children}
    </BadgeStyle>
  );
};

export default Badge;
