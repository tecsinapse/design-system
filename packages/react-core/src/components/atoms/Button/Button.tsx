import React from 'react';
import { View } from 'react-native';
import { StyledButton } from './styled';

export interface ButtonProps {
  children: JSX.Element;
  onClick?: () => void;
}

const Button = (props: ButtonProps): JSX.Element => {
  const { children, onClick } = props;
  return (
    <View>
      <StyledButton accessibilityRole="button" onPress={onClick}>
        {children}
      </StyledButton>
    </View>
  );
};

export default Button;
