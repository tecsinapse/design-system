import styled, { css } from '@emotion/native';
import { View } from 'react-native';
import { PaperProps, StyleProps } from '@tecsinapse/react-core';

const baseStyles = ({ theme }) => css`
  background: white;
  padding: 30px;
  box-shadow: -2px 2px 2px ${theme.miscellaneous.shadow};
`;

export const PaperStyled = styled(View)<PaperProps & Partial<StyleProps>>(
  baseStyles
);
