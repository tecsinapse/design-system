import React from 'react';
import { View } from 'react-native';
import styled from '@emotion/native';

export interface PaperProps {
  children?: JSX.Element;
  style?: any;
}
export const Paper = ({ children, style = {} }: PaperProps): JSX.Element => {
  return <PaperStyled style={style}>{children}</PaperStyled>;
};

const PaperStyled = styled(View)`
  background: white;
  padding: 30px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
`;
