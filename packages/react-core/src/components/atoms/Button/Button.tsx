import React, { FC } from 'react';
import { View } from 'react-native';
import { StyledButton } from './styled';
import { ClassNamesProps } from '@emotion/react';
import { ColorType, VariantType } from '@tecsinapse/react-core';

export interface ButtonProps {
  children: JSX.Element;
  onClick?: () => void;
  style?: ClassNamesProps;
  color: ColorType;
  variant: VariantType;
}

const Button: FC<ButtonProps> = ({
  children,
  onClick,
  style,
  color,
  variant,
}): JSX.Element => {
  return (
    <View>
      <StyledButton
        accessibilityRole="button"
        onPress={onClick}
        style={style}
        color={color}
        variant={variant}
      >
        {children}
      </StyledButton>
    </View>
  );
};

export default Button;
