import styled from '@emotion/styled';
import { hex2rgba, StyleProps } from '@tecsinapse/react-core';

export const TRow = styled('tr')<Partial<StyleProps>>`
  box-shadow: 0 2px 8px
    ${({ theme }) => hex2rgba(theme.miscellaneous.shadow, 0.05)};
  border-radius: ${({ theme }) => theme.borderRadius.mili};
`;
