import React from 'react';
import { View, TouchableHighlight } from 'react-native';
import styled from '@emotion/native';

const StyledButton = styled(TouchableHighlight)`
  padding: 10px;
  background-color: ${props => props.theme.backgroundColor || 'blue'};
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
      <StyledButton onPress={onClick}>{children}</StyledButton>
    </View>
  );
};

export default Button;
