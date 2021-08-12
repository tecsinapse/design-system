import styled from '@emotion/styled';
import {
  hex2rgba,
  StyleProps,
  ThemeProp,
  ThemeProviderProps,
} from '@tecsinapse/react-core';
import { SelectProps } from '../Select';

type TypeAux = {
  theme: ThemeProviderProps;
  hideSearchBar: boolean;
};

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
`;

export const SearchBarContainer = styled('div')<Partial<StyleProps>>`
  padding: ${({ theme }) =>
    `0px ${theme.spacing.deca} ${theme.spacing.deca} ${theme.spacing.deca}`};
`;
