import styled, { css } from '@emotion/native';
import { FC } from 'react';
import { Platform } from 'react-native';
import { StyleProps } from '../../../types/defaults';
import { RFValue, RFValueStr } from '../../../utils';
import {
  PressableSurface,
  PressableSurfaceProps
} from '../../atoms/PressableSurface';
import { DateTimeSelectorProps } from '../DateTimeSelector';

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

export const ModalContent = styled.View<
  { offset: number } & Partial<StyleProps>
>`
  background-color: transparent;
  padding-bottom: ${({ offset }) => `${RFValue(offset)}px`};
  ${({ theme: { borderRadius } }) => css`
    ${isWeb
      ? `
      width: ${RFValueStr('375px')};
      border-radius: ${borderRadius.micro};
    `
      : `
      border-top-left-radius: ${borderRadius.deca};
      border-top-right-radius: ${borderRadius.deca};
    `}
  `}
  overflow: hidden;
`;

export const getStyledDateTimeSelector = (
  component: FC<DateTimeSelectorProps>
) => {
  return styled(component)<Partial<StyleProps>>`
    padding: ${({ theme }) => theme.spacing.deca};
  `;
};
