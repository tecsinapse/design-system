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

export const StyledSpan = styled('span')<
  Partial<StyleProps> & { singleHighligh: boolean }
>`
  color: ${({ theme, singleHighligh }) =>
    singleHighligh ? theme.color.primary.xlight : theme.color.secondary.xlight};
  padding: ${({ theme }) => `${theme.spacing.mili} 0px`};
`;

export const StyledContainerTextLabel = styled('div')<Partial<StyleProps>>`
  padding-left: ${({ theme }) => theme.spacing.mili};
  width: 100%;
  display: flex;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
