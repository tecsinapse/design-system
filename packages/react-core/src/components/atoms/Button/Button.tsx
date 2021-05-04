import React from 'react';
import { View } from 'react-native';
import { StyledButton } from './styled';
import { ClassNamesProps } from '@emotion/react';

export interface ButtonProps {
  children: JSX.Element;
  onClick?: () => void;
  style?: ClassNamesProps;
}

const Button = (props: ButtonProps): JSX.Element => {
  const { children, onClick, style } = props;
  return (
    <View>
      <StyledButton accessibilityRole="button" onPress={onClick} style={style}>
        {children}
      </StyledButton>
    </View>
  );
};

export default Button;
