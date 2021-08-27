import styled from '@emotion/styled';
import { StyleProps } from '@tecsinapse/react-core';
import { Td } from '../../atoms/Table';

export const CheckboxCell = styled(Td)<Partial<StyleProps>>`
  padding: ${({ theme }) => theme.spacing.mili};
  & * {
    user-select: none;
  }
`;
