import React from 'react';
import { View } from 'react-native';
import styled from '@emotion/native';

export const Paper = () => {
  return <PaperStyled />;
};

const PaperStyled = styled(View)`
  background: white;
  padding: 30px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
`;
