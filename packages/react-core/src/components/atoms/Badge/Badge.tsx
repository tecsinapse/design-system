import React, { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { ColorGradationType, ColorType } from '../../../types/defaults';
import { BadgeStyle, ViewStyled } from './styled';

export interface BadgeProps {
  color: ColorType;
  tone?: ColorGradationType;
  style?: StyleProp<ViewStyle>;
  value: React.ReactNode;
  children?: ReactNode;
}

const Badge = ({
  children,
  style,
  color = 'primary',
  tone = 'medium',
  value,
}: BadgeProps): React.ReactElement => {
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
