import styled from '@emotion/styled';
import { StyleProps } from '@tecsinapse/react-core';
import { hex2rgba } from '@tecsinapse/react-core/dist/styles/definitions';
import { SelectProps } from './Select';

export const StyledContainerContainer = styled('div')<Partial<StyleProps>>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-width: 400px;
  position: relative;
`;

export const StyledInputContainer = styled('div')<Partial<StyleProps>>`
  background-color: ${({ theme }) => theme.miscellaneous.bodyColor};
  width: 100%;
  border-radius: ${({ theme }) => theme.borderRadius.mili};
`;

export const StyledContainerDropdown = styled('div')<
  Partial<StyleProps & SelectProps<any, any>>
>`
  width: 100%;
  background-color: ${({ theme }) => theme.miscellaneous.surfaceColor};
  border-radius: ${({ theme }) => theme.borderRadius.mili};
  box-shadow: 0px 2px 8px
    ${({ theme }) => hex2rgba(theme.miscellaneous.shadow, 0.08)};
  margin-top: ${({ theme }) => theme.spacing.centi};
  top: 100%;
  position: absolute;
  padding-top: ${({ theme, hideSearchBar }) =>
    !hideSearchBar ? '16px' : '0px'};
  padding-right: ${({ theme, hideSearchBar }) =>
    hideSearchBar ? '0px' : theme.spacing.mili};
`;

export const SearchBarContainer = styled('div')<Partial<StyleProps>>`
  padding: ${({ theme }) =>
    `0px ${theme.spacing.deca} ${theme.spacing.deca} ${theme.spacing.deca}`};
`;
