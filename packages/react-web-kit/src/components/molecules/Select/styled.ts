import styled from '@emotion/styled';
import { StyleProps } from '@tecsinapse/react-core';
import { hex2rgba } from '@tecsinapse/react-core/dist/styles/definitions';

export const StyledContainerContainer = styled('div')<Partial<StyleProps>>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 200px;
`;

export const StyledInputContainer = styled('div')<Partial<StyleProps>>`
  background-color: ${({ theme }) => theme.miscellaneous.bodyColor};
  width: 100%;
`;

export const StyledContainerDropdown = styled('div')<Partial<StyleProps>>`
  width: 100%;
  background-color: ${({ theme }) => theme.miscellaneous.surfaceColor};
  border-radius: ${({ theme }) => theme.borderRadius.mili};
  box-shadow: 0px 2px 8px
    ${({ theme }) => hex2rgba(theme.miscellaneous.shadow, 0.08)};
`;
