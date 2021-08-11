import styled from '@emotion/styled';
import { hex2rgba, StyleProps } from '@tecsinapse/react-core';

export const TContainer = styled('div')<Partial<StyleProps>>`
  background-color: ${({ theme }) => theme.miscellaneous.surfaceColor};
  border-radius: ${({ theme }) => theme.borderRadius.mili};
  box-shadow: 0 2px 8px
    ${({ theme }) => hex2rgba(theme.miscellaneous.shadow, 0.08)};
  padding: ${({ theme }) => `${theme.spacing.deca} 0`};
`;
