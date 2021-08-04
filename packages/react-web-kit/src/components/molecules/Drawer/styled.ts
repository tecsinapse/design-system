import styled from '@emotion/styled';
import { hex2rgba, StyleProps } from '@tecsinapse/react-core';
import { DrawerProps, OverlayProps } from './Drawer';
import { css } from '@emotion/react';

export const StyledOverlay = styled('div')<Partial<StyleProps> & OverlayProps>`
  background: ${({ theme }: StyleProps) =>
    hex2rgba(theme.miscellaneous.overlay, 0.5)};
  width: 100vw;
  height: 100vh;
  z-index: ${({ theme, active }: StyleProps & OverlayProps) =>
    active ? theme.zIndex.drawer : theme.zIndex.default};
  cursor: ${({ active }: OverlayProps) => (active ? 'pointer' : 'default')};
  position: absolute;
  transition: opacity 300ms ease-in-out;
  opacity: ${({ active }: OverlayProps) => (active ? 1 : 0)};
`;

const anchorLeft = ({
  theme,
  anchorPosition,
  open,
}: StyleProps & DrawerProps) => {
  return (
    anchorPosition === 'left' &&
    css`
      left: 0;
      top: 0;
      border-top-right-radius: ${theme.borderRadius.centi};
      border-bottom-right-radius: ${theme.borderRadius.centi};
      transform: ${open ? 'translateX(0%)' : 'translateX(-100%)'};
      height: 100vh;
    `
  );
};
const anchorRight = ({
  theme,
  anchorPosition,
  open,
}: StyleProps & DrawerProps) => {
  return (
    anchorPosition === 'right' &&
    css`
      right: 0;
      top: 0;
      border-top-left-radius: ${theme.borderRadius.centi};
      border-bottom-left-radius: ${theme.borderRadius.centi};
      transform: ${open ? 'translateX(0)' : 'translateX(100%)'};
      height: 100vh;
    `
  );
};

const anchorTop = ({
  theme,
  anchorPosition,
  open,
}: StyleProps & DrawerProps) => {
  return (
    anchorPosition === 'top' &&
    css`
      left: 0;
      right: 0;
      top: 0;
      border-bottom-right-radius: ${theme.borderRadius.centi};
      border-bottom-left-radius: ${theme.borderRadius.centi};
      transform: ${open ? 'translateY(0%)' : 'translateY(-100%)'};
      width: 100vw;
    `
  );
};

const anchorBottom = ({
  theme,
  anchorPosition,
  open,
}: StyleProps & DrawerProps) => {
  return (
    anchorPosition === 'bottom' &&
    css`
      left: 0;
      right: 0;
      bottom: 0;
      border-top-right-radius: ${theme.borderRadius.centi};
      border-top-left-radius: ${theme.borderRadius.centi};
      transform: ${open ? 'translateY(0%)' : 'translateY(100%)'};
      width: 100vw;
    `
  );
};

const baseStyles = ({ theme }: StyleProps & DrawerProps) => {
  return css`
    transition: transform 300ms ease-in-out;
    position: fixed;
    background-color: ${theme.miscellaneous.bodyColor};
    z-index: ${`calc(${theme.zIndex.drawer} + 1)`};
  `;
};

export const StyledContainerDrawer = styled('div')<
  DrawerProps & Partial<StyleProps>
>(
  props => css`
    ${baseStyles(props)}
    ${anchorBottom(props)}
    ${anchorTop(props)}
    ${anchorLeft(props)}
    ${anchorRight(props)}
  `
);
