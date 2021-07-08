import styled from '@emotion/native';
import {
  BoxContent,
  BoxContentProps,
  hex2rgba,
  PressableSurface,
  StyleProps,
} from '@tecsinapse/react-core';
import { DrawerProps } from './Drawer';
import { View } from 'react-native';

export const StyledOverlay = styled(PressableSurface)<Partial<StyleProps>>`
  background: ${({ theme }) => hex2rgba(theme.miscellaneous.overlay, 0.5)};
  width: 100%;
  height: 100vh;
  z-index: 10;
`;

export const StyledContainerDrawer = styled(BoxContent)<
  Partial<StyleProps & BoxContentProps>
>`
  height: 100vh;
  position: absolute;
  z-index: 11;
  ${({ variant }) =>
    variant === 'left'
      ? `
      left: 0;
      top: 0;
    `
      : ` 
      right: 0;
      top: 0;
      `}
`;

export const StyledContainerStory = styled(View)<
  Partial<DrawerProps & StyleProps>
>`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
`;

export const StyledContainerButtonStory = styled(View)<Partial<DrawerProps>>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: absolute;
`;
