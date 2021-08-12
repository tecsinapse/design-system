import styled from '@emotion/styled';
import { hex2rgba, StyleProps } from '@tecsinapse/react-core';
import { SelectProps } from '../Select';

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
    !hideSearchBar ? `${theme.spacing.deca}` : '0px'};
  padding-bottom: ${({ theme }) => theme.spacing.mili};
`;

export const SearchBarContainer = styled('div')<Partial<StyleProps>>`
  padding: ${({ theme }) =>
    `0px ${theme.spacing.deca} ${theme.spacing.deca} ${theme.spacing.deca}`};
`;
