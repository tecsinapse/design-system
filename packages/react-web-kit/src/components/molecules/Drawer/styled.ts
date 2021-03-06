import styled from '@emotion/styled';
import { StyleProps } from '@tecsinapse/react-core';
import { DrawerProps } from './Drawer';
import { css } from '@emotion/react';

const anchorLeft = ({ theme, anchorPosition }: StyleProps & DrawerProps) => {
  return (
    anchorPosition === 'left' &&
    css`
      left: 0;
      top: 0;
      border-top-right-radius: ${theme.borderRadius.centi};
      border-bottom-right-radius: ${theme.borderRadius.centi};
    `
  );
};
const anchorRight = ({ theme, anchorPosition }: StyleProps & DrawerProps) => {
  return (
    anchorPosition === 'right' &&
    css`
      right: 0;
      top: 0;
      border-top-left-radius: ${theme.borderRadius.centi};
      border-bottom-left-radius: ${theme.borderRadius.centi};
    `
  );
};

const anchorTop = ({ theme, anchorPosition }: StyleProps & DrawerProps) => {
  return (
    anchorPosition === 'top' &&
    css`
      left: 0;
      right: 0;
      top: 0;
      border-bottom-right-radius: ${theme.borderRadius.centi};
      border-bottom-left-radius: ${theme.borderRadius.centi};
    `
  );
};

const anchorBottom = ({ theme, anchorPosition }: StyleProps & DrawerProps) => {
  return (
    anchorPosition === 'bottom' &&
    css`
      left: 0;
      right: 0;
      bottom: 0;
      border-top-right-radius: ${theme.borderRadius.centi};
      border-top-left-radius: ${theme.borderRadius.centi};
    `
  );
};

const baseStyles = ({ theme, anchorPosition }: StyleProps & DrawerProps) => {
  return css`
    height: ${['left', 'right'].includes(anchorPosition) && '100vh'};
    width: ${['top', 'bottom'].includes(anchorPosition) && '100wh'};
    position: fixed;
    overflow: hidden;
    background-color: ${theme.miscellaneous.bodyColor};
    z-index: ${theme.zIndex.drawer};
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
