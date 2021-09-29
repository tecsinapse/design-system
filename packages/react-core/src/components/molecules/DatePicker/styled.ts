import styled, { css } from '@emotion/native';
import { FC } from 'react';
import { Platform } from 'react-native';
import { StyleProps } from '../../../types/defaults';
import { Icon } from '../../atoms/Icon';
import { disabledInputStyles, InputContainerProps } from '../../atoms/Input';
import { PressableSurface } from '../../atoms/PressableSurface';
import { TextProps } from '../../atoms/Text';
import { hex2rgba } from '@tecsinapse/react-core';

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

export const ModalContent = styled.View<
  { offset: number } & Partial<StyleProps>
>`
  background-color: transparent;
  padding-bottom: ${({ offset }) => `${offset}px`};
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

export const getStyledTextComponent = (component: FC<TextProps>) => {
  return styled(component)(
    (props: Partial<InputContainerProps> & Partial<StyleProps>) => css`
      line-height: ${props.theme?.typography.h5.lineHeight};
      ${disabledInputStyles(props)}
    `
  );
};

export const CalendarIcon = styled(Icon)<Partial<StyleProps>>`
  padding: ${({ theme }) => theme.spacing.centi};
  color: ${({ theme }) => theme.color.secondary.medium};
`;
