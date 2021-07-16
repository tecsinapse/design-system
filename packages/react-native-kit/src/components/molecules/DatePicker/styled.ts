import styled, { css } from '@emotion/native';
import {
  PressableSurface,
  PressableSurfaceProps,
  StyleProps,
} from '@tecsinapse/react-core';
import { Modal } from 'react-native';

export const StyledPressableSurface = styled(
  PressableSurface
)<PressableSurfaceProps>`
  width: 100%;
`;

export const Backdrop = styled.Pressable<Partial<StyleProps>>`
  justify-content: flex-end;
  background-color: rgba(0, 0, 0, 0.5);
  height: 100%;
`;

export const ModalContent = styled.View<Partial<StyleProps>>`
  background-color: transparent;
  ${({ theme: { borderRadius } }) => css`
    border-top-left-radius: ${borderRadius.deca};
    border-top-right-radius: ${borderRadius.deca};
  `}
  overflow: hidden;
`;
