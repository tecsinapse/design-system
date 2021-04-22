import React from 'react';
import { Text as RNText } from 'react-native';
import styled from '@emotion/native';

export interface TextProps {
  children: JSX.Element | string;
}

const Text = (props: TextProps): JSX.Element => {
  const { children } = props;
  return <StyledText>{children}</StyledText>;
};

const StyledText = styled(RNText)`
  color: ${props => props.theme.color || 'white'};
`;

export default Text;
