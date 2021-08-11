import styled from '@emotion/styled';
import { StyleProps } from '@tecsinapse/react-core';

export const TableStyled = styled('table')<Partial<StyleProps>>`
  width: 100%;
  min-width: 200px;
  border-spacing: ${({ theme }) =>
    `${theme.spacing.kilo} ${theme.spacing.mili}`};
`;
