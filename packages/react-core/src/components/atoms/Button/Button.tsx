import React from 'react';
import { View, TouchableHighlight } from 'react-native';
import styled from '@emotion/native';

const StyledButton = styled(TouchableHighlight)`
  padding: 10px;
  background-color: ${({ theme }) => theme.primary.main};
  border-radius: 4px;
`;

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
