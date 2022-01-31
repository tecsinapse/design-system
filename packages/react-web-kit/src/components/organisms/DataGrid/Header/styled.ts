import styled from '@emotion/styled';
import { StyleProps } from '@tecsinapse/react-core';
import { Th } from '../../../atoms/Table';

export const CheckboxHeader = styled(Th)<Partial<StyleProps>>`
  padding: 0 0 0 ${({ theme }) => theme.spacing.mili};
  & * {
    user-select: none;
  }
`;
