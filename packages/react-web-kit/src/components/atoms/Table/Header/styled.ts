import styled from '@emotion/styled';
import { StyleProps } from '@tecsinapse/react-core';

export const ThStyled = styled('th')<Partial<StyleProps>>`
  padding: ${({ theme }) => `${theme.spacing.centi} ${theme.spacing.deca}`};
`;

export const THeadStyled = styled('thead')<Partial<StyleProps>>`
  & > tr {
    border-radius: 0;
    box-shadow: none;
  }
`;
