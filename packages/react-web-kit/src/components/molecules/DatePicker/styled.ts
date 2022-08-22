import styled, { css } from '@emotion/native';
import { hex2rgba, PressableSurface, StyleProps } from '@tecsinapse/react-core';
import { Platform } from 'react-native';

const isWeb = Platform.OS === 'web';

export const Backdrop = styled(PressableSurface)<Partial<StyleProps>>`
  ${({ theme }) =>
    isWeb
      ? css`
          justify-content: center;
          align-items: center;
          background-color: ${hex2rgba(theme.miscellaneous.overlay, 0.5)};
          height: 100vh;
        `
      : css`
          justify-content: flex-end;
          background-color: ${hex2rgba(theme.miscellaneous.overlay, 0.5)};
          height: 100%;
        `}
`;

export const ModalContent = styled.View<Partial<StyleProps>>`
  background-color: transparent;
  ${({ theme: { borderRadius } }) => css`
    ${isWeb
      ? `
      border-radius: ${borderRadius.micro};
    `
      : `
      border-top-left-radius: ${borderRadius.deca};
      border-top-right-radius: ${borderRadius.deca};
    `}
  `}
  overflow: hidden;
`;
