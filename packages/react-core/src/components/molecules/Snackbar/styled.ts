import { Animated, View } from 'react-native';
import styled, { css } from '@emotion/native';
import { ProgressBar, StyleProps } from '@tecsinapse/react-core';
import { SnackbarProps } from './Snackbar';
import { Paper } from '../../atoms/Paper';
import { PressableSurface } from '../../atoms/PressableSurface';

const baseStyles = ({
  theme,
  colorTone = 'xlight',
  colorVariant = 'primary',
  visible,
}: StyleProps & Partial<SnackbarProps> & { visible: boolean }) => css`
  border-radius: ${theme.borderRadius.mili};
  background-color: ${theme.color[colorVariant][colorTone]};
  position: absolute;
  z-index: ${theme.zIndex.modal};
  display: ${visible ? 'flex' : 'none'};
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const anchorTop = ({
  theme,
  anchor,
  anchorDistance,
}: Partial<SnackbarProps> & StyleProps) => {
  return (
    anchor === 'top' &&
    css`
      top: ${anchorDistance ? `${anchorDistance}px` : theme.spacing.deca};
    `
  );
};

const anchorBottom = ({
  theme,
  anchor,
  anchorDistance,
}: Partial<SnackbarProps> & StyleProps) => {
  return (
    anchor === 'bottom' &&
    css`
      bottom: ${anchorDistance ? `${anchorDistance}px` : theme.spacing.deca};
    `
  );
};

export const SnackbarContainer = styled(Paper)<
  Partial<SnackbarProps & StyleProps> & { visible: boolean }
>(
  props => css`
    ${baseStyles(props)}
    ${anchorBottom(props)}
    ${anchorTop(props)}
  `
);

export const ContentContainer = styled(View)`
  flex-direction: row;
  display: flex;
  align-items: center;
  flex-shrink: 1;
`;

export const Container = styled(Animated.View)`
  width: 100%;
  height: 100%;
`;
export const IconContainer = styled(View)<Partial<StyleProps>>`
  flex-direction: row;
  display: flex;
  align-items: center;
  margin-right: ${({ theme }) => theme.spacing.mili};
`;

export const DismissContainer = styled(PressableSurface)<Partial<StyleProps>>`
  flex-direction: row;
  display: flex;
  align-items: center;
  margin-left: ${({ theme }) => theme.spacing.mili};
`;

export const StyledProgressBar = styled(ProgressBar)<Partial<StyleProps>>`
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
`;

export const StyledContainerFlexRow = styled(View)<Partial<StyleProps>>`
  display: flex;
  flex-direction: row;
  padding: ${({ theme }) => theme.spacing.mili};
`;
