import React, { FC } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { ColorGradationType, ColorType } from '@tecsinapse/react-core';
import { BadgeStyle, ViewStyled } from './styled';

export interface BadgeProps {
  color: ColorType;
  tone?: ColorGradationType;
  style?: StyleProp<ViewStyle>;
  value: React.ReactNode;
}

const Badge: FC<BadgeProps> = ({
  children,
  style,
  color = 'primary',
  tone = 'medium',
  value,
}): JSX.Element => {
  return (
    <ViewStyled>
      {children}
      <BadgeStyle style={style} color={color} tone={tone}>
        {value}
      </BadgeStyle>
    </ViewStyled>
  );
};

export default Badge;
