import styled from '@emotion/styled';
import { hex2rgba, StyleProps } from '@tecsinapse/react-core';
import { SelectProps } from '../Select';

export const StyledContainerDropdown = styled('div')<
  Partial<StyleProps & SelectProps<any, any> & { lengthOptions: number }>
>`
  width: 100%;
  background-color: ${({ theme }: StyleProps) =>
    theme.miscellaneous.surfaceColor};
  border-radius: ${({ theme }: StyleProps) => theme.borderRadius.mili};
  box-shadow: 0px 2px 8px
    ${({ theme }: StyleProps) => hex2rgba(theme.miscellaneous.shadow, 0.08)};
  margin-top: ${({ theme }: StyleProps) => theme.spacing.centi};
  top: 100%;
  position: absolute;
  padding-top: ${({
    theme,
    hideSearchBar,
  }: StyleProps & Partial<SelectProps<any, any>>) =>
    !hideSearchBar ? `${theme.spacing.deca}` : '0px'};
  padding-bottom: ${({ theme }: StyleProps) => theme.spacing.mili};
`;

export const StyledTest = styled('div')<
  Partial<StyleProps & SelectProps<any, any> & { lenghtOptions: number }>
>`
  max-height: 250px;
  top: 100%;
  overflow-y: ${({
    lenghtOptions = 0,
  }: Partial<{ lenghtOptions: number } & StyleProps>) =>
    lenghtOptions > 5 ? 'scroll' : 'hidden'};
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: ${({ theme }: StyleProps) => theme.borderRadius.centi};
    background-color: ${({ theme }: StyleProps) => theme.color.secondary.light};
  }
  ::-webkit-scrollbar-thumb:hover {
    background-color: ${({ theme }: StyleProps) => theme.color.primary.light};
  },
`;

export const SearchBarContainer = styled('div')<Partial<StyleProps>>`
  padding-left: ${({ theme }) => theme.spacing.mili};
  width: 100%;
`;

export const StyledContainerCheckAll = styled('div')<Partial<StyleProps>>`
  padding: ${({ theme }) => `${theme.spacing.mili} ${theme.spacing.deca}`};
  flex-direction: row;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.color.primary.xlight};
  }
  &:hover span {
    color: ${({ theme }) => theme.color.primary.medium};
  }
`;

export const StyledSpan = styled('span')<Partial<StyleProps>>`
  color: ${({ theme }) => theme.color.primary.medium};
  padding: ${({ theme }) => `${theme.spacing.mili} 0px`};
`;

export const StyledContainerTextLabel = styled('div')<Partial<StyleProps>>`
  padding-left: ${({ theme }) => theme.spacing.mili};
  width: 100%;
  display: flex;
  overflow: hidden;
`;
