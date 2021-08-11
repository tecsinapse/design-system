import styled from '@emotion/styled';
import { StyleProps } from '@tecsinapse/react-core';

export const TCell = styled('td')<Partial<StyleProps>>`
  padding: ${({ theme }) => theme.spacing.deca};
`;
