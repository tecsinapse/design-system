import styled from '@emotion/styled';
import { StyleProps } from '@tecsinapse/react-core';
import { hex2rgba } from '@tecsinapse/react-core/dist/styles/definitions';
import { View, ViewProps } from 'react-native';

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
  user-select: none;
`;

export const StyledContainerDropdown = styled('div')<Partial<StyleProps>>`
  width: 100%;
  background-color: ${({ theme }) => theme.miscellaneous.surfaceColor};
  border-radius: ${({ theme }) => theme.borderRadius.mili};
  box-shadow: 0px 2px 8px
    ${({ theme }) => hex2rgba(theme.miscellaneous.shadow, 0.08)};
  margin-top: ${({ theme }) => theme.spacing.mega};
  top: 100%;
  position: absolute;
  padding: 16px 0px 8px 0px;
`;

export const SearchBarContainer = styled('div')<Partial<StyleProps>>`
  padding: ${({ theme }) => theme.spacing.deca};
`;
