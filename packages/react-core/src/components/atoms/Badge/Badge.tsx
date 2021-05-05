import React, { FC } from 'react';
import { BadgeStyle } from './styled';
import { StyleProp, ViewStyle } from 'react-native';

export interface BadgeProps {
  children?: JSX.Element;
  variant: string;
  style?: StyleProp<ViewStyle>;
}

const Badge: FC<BadgeProps> = ({ children, variant, style }): JSX.Element => {
  return (
    <BadgeStyle style={style} variant={variant}>
      {children}
    </BadgeStyle>
  );
};

export default Badge;
