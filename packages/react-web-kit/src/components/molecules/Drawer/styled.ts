import styled from '@emotion/styled';
import { hex2rgba, StyleProps } from '@tecsinapse/react-core';
import { DrawerProps } from './Drawer';

export const StyledOverlay = styled('div')<Partial<StyleProps>>`
  background: ${({ theme }: StyleProps) =>
    hex2rgba(theme.miscellaneous.overlay, 0.5)};
  width: 100vw;
  height: 100vh;
  z-index: ${({ theme }: StyleProps) => theme.zIndex.drawer};
  cursor: pointer;
  position: absolute;
`;

const anchorLeft = ({ theme }: StyleProps) => {
  return `
      left: 0;
      top: 0;
      border-top-right-radius: ${theme.borderRadius.centi};
      border-bottom-right-radius: ${theme.borderRadius.centi};
    `;
};
const anchorRight = ({ theme }: StyleProps) => {
  return ` 
      right: 0;
      top: 0;
      border-top-left-radius: ${theme.borderRadius.centi};
      border-bottom-left-radius: ${theme.borderRadius.centi}; 
      `;
};

export const StyledContainerDrawer = styled('div')<
  Partial<DrawerProps & StyleProps>
>`
  height: 100vh;
  position: absolute;
  background-color: ${({ theme }: StyleProps) => theme.miscellaneous.bodyColor};
  z-index: ${({ theme }: StyleProps) => `calc(${theme.zIndex.drawer} + 1)`};
  ${({ anchorPosition, ...props }: StyleProps & Partial<DrawerProps>) =>
    anchorPosition === 'left' ? anchorLeft(props) : anchorRight(props)}
`;
