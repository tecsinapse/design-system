import React, { FC } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { StyledButton } from './styled';
import { PressableSurfaceProps } from '../PressableSurface';
import {
  BorderRadiusType,
  ColorGradationType,
  ColorType,
  VariantType,
} from '@tecsinapse/react-core';

export interface ButtonProps extends PressableSurfaceProps {
  style?: StyleProp<ViewStyle>;
  color?: ColorType;
  variant?: VariantType;
  tone?: ColorGradationType;
  disabled?: boolean;
  borderRadius?: BorderRadiusType;
  size?: 'small' | 'default';
}

const Button: FC<ButtonProps> = ({
  children,
  style,
  color = 'primary',
  variant = 'filled',
  tone = 'medium',
  ...rest
}): JSX.Element => {
  return (
    <StyledButton
      {...rest}
      accessibilityRole="button"
      style={style}
      color={color}
      variant={variant}
      tone={tone}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
