import styled from '@emotion/styled';
import {
  hex2rgba,
  StyleProps,
  ThemeProviderProps,
} from '@tecsinapse/react-core';
import { SelectProps } from '../Select';

export const StyledContainerDropdown = styled('div')<
  Partial<StyleProps & SelectProps<any, any>>
>`
  width: 100%;
  background-color: ${({ theme }: ThemeProviderProps) =>
    theme.miscellaneous.surfaceColor};
  border-radius: ${({ theme }: ThemeProviderProps) => theme.borderRadius.mili};
  box-shadow: 0px 2px 8px
    ${({ theme }: ThemeProviderProps) =>
      hex2rgba(theme.miscellaneous.shadow, 0.08)};
  margin-top: ${({ theme }: ThemeProviderProps) => theme.spacing.centi};
  top: 100%;
  position: absolute;
  padding-top: ${({
    theme,
    hideSearchBar,
  }: ThemeProviderProps & Partial<SelectProps<any, any>>) =>
    !hideSearchBar ? `${theme.spacing.deca}` : '0px'};
  padding-bottom: ${({ theme }: ThemeProviderProps) => theme.spacing.mili};
  max-height: ${({ hideSearchBar }: Partial<SelectProps<any, any>>) =>
    !hideSearchBar ? '250px' : '200px'};
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: ${({ theme }) => theme.borderRadius.centi};
    background-color: ${({ theme }) => theme.color.secondary.medium};
  }
  ::-webkit-scrollbar-thumb:hover {
    background-color: ${({ theme }) => theme.color.primary.medium};
  },
`;

export const SearchBarContainer = styled('div')<Partial<StyleProps>>`
  padding: ${({ theme }) =>
    `0px ${theme.spacing.deca} ${theme.spacing.deca} ${theme.spacing.deca}`};
`;
