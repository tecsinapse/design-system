import styled, { css } from '@emotion/native';
import { Platform } from 'react-native';
import { StyleProps } from '../../../types/defaults';

const isWeb = Platform.OS === 'web';

export const Backdrop = styled.Pressable<Partial<StyleProps>>`
  ${isWeb
    ? css`
        justify-content: center;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.5);
        height: 100vh;
      `
    : css`
        justify-content: flex-end;
        background-color: rgba(0, 0, 0, 0.5);
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
