import styled, { css } from '@emotion/native';
import { DateTimeSelector } from '../DateTimeSelector';
import {
  PressableSurface,
  PressableSurfaceProps,
} from '../../atoms/PressableSurface';

import { StyleProps } from '../../../types/defaults';
import { Platform } from 'react-native';

const isWeb = Platform.OS === 'web';

export const StyledPressableSurface = styled(
  PressableSurface
)<PressableSurfaceProps>`
  width: 100%;
`;

export const Backdrop = styled(PressableSurface)<Partial<StyleProps>>`
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
      width: 375px;
      border-radius: ${borderRadius.micro};
    `
      : `
      border-top-left-radius: ${borderRadius.deca};
      border-top-right-radius: ${borderRadius.deca};
    `}
  `}
  overflow: hidden;
`;

export const StyledDateTimeSelector = styled(DateTimeSelector)<
  Partial<StyleProps>
>`
  padding: ${({ theme }) => theme.spacing.deca};
`;
