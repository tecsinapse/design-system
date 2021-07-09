import styled from '@emotion/styled';
import { hex2rgba, StyleProps } from '@tecsinapse/react-core';
import { DrawerProps } from '@tecsinapse/react-web-kit';

export const StyledOverlay = styled('div')<Partial<StyleProps>>`
  background: ${({ theme }) => hex2rgba(theme.miscellaneous.overlay, 0.5)};
  width: 100%;
  height: 100vh;
  z-index: 10;
`;

export const StyledContainerDrawer = styled('div')<
  Partial<DrawerProps & StyleProps>
>`
  height: 100vh;
  position: absolute;
  background-color: ${({ theme }) => theme.miscellaneous.bodyColor};
  z-index: 11;
  ${({ anchorPosition }) =>
    anchorPosition === 'left'
      ? `
      left: 0;
      top: 0;
      border-top-right-radius: 16px;
      border-bottom-right-radius: 16px;
    `
      : ` 
      right: 0;
      top: 0;
      border-top-left-radius: 16px;
      border-bottom-left-radius: 16px; 
      `}
`;
