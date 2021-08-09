import styled from '@emotion/styled';
import { StyleProps } from '@tecsinapse/react-core';

export const ContainerItemSelect = styled('div')<Partial<StyleProps>>`
  padding: 8px 16px;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.color.primary.xlight};
  }
`;

export const StyledSpan = styled('div')<Partial<StyleProps>>`
  color: ${({ theme }) => theme.color.secondary.xdark};
  &:hover {
    color: ${({ theme }) => theme.color.primary.medium};
  }
  width: 100%;
  height: 100%;
`;
