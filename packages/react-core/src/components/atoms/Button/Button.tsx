import React, { FC } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { StyledButton } from './styled';
import { ColorScale, ColorType, VariantType } from '@tecsinapse/react-core';

export interface ButtonProps {
  children: JSX.Element;
  onClick?: () => void;
  style?: StyleProp<ViewStyle>;
  color?: ColorType;
  variant?: VariantType;
  tone?: ColorScale;
}

const Button: FC<ButtonProps> = ({
  children,
  onClick,
  style,
  color = 'primary',
  variant = 'filled',
  tone = 'medium',
}): JSX.Element => {
  return (
    <StyledButton
      accessibilityRole="button"
      onPress={onClick}
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
