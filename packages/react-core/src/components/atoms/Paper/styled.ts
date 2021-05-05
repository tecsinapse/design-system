import styled from '@emotion/native';
import { View } from 'react-native';
import { PaperProps, StyleProps } from '@tecsinapse/react-core';

export const PaperStyled = styled(View)<PaperProps & Partial<StyleProps>>`
  background: white;
  padding: 30px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
`;
