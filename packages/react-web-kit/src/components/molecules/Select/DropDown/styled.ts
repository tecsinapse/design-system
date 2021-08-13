import styled from '@emotion/styled';
import { hex2rgba, StyleProps } from '@tecsinapse/react-core';
import { SelectProps } from '../Select';

export const StyledContainerDropdown = styled('div')<
  Partial<StyleProps & SelectProps<any, any>>
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
  max-height: ${({
    hideSearchBar = false,
  }: Partial<SelectProps<any, any> & StyleProps>) =>
    !hideSearchBar ? '250px' : '200px'};
  overflow-y: scroll;
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
  padding: ${({ theme }: StyleProps) =>
    `0px ${theme.spacing.deca} ${theme.spacing.deca} ${theme.spacing.deca}`};
`;
