import React, { FC } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { StyledButton } from './styled';
import { ColorGradationType, ColorType, VariantType } from '@tecsinapse/react-core';

export interface ButtonProps {
  children: JSX.Element;
  onClick?: () => void;
  style?: StyleProp<ViewStyle>;
  color?: ColorType;
  variant?: VariantType;
  tone?: ColorGradationType;
}

const Button: FC<ButtonProps> = ({
  children,
  onClick,
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
