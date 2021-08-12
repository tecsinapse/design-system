import styled from '@emotion/styled';
import { StyleProps } from '@tecsinapse/react-core';

export const ContainerItemSelect = styled('div')<Partial<StyleProps>>`
  padding: ${({ theme }) => `${theme.spacing.mili} ${theme.spacing.deca}`};
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.color.primary.xlight};
  }
  &:hover span {
    color: ${({ theme }) => theme.color.primary.medium};
  }
  flex-direction: row;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StyledSpan = styled('span')<Partial<StyleProps>>`
  color: ${({ theme }) => theme.color.secondary.xdark};
  padding: ${({ theme }) => `${theme.spacing.mili} 0px`};
`;
