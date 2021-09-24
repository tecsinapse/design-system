import { View } from 'react-native';
import styled, { css } from '@emotion/native';
import { SnackbarProps } from './Snackbar';
import { StyleProps } from '../../../types/defaults';
import { ProgressBar } from '../../atoms/ProgressBar';
import { Paper } from '../../atoms/Paper';
import { PressableSurface } from '../../atoms/PressableSurface';

const baseStyles = ({
  theme,
  colorTone = 'xlight',
  colorVariant = 'primary',
  visible,
}: StyleProps & Partial<SnackbarProps> & { visible: boolean }) => css`
  padding: 0;
  border-radius: ${theme.borderRadius.mili};
  background-color: ${theme.color[colorVariant][colorTone]};
  position: fixed;
  z-index: ${theme.zIndex.modal};
  display: ${visible ? 'flex' : 'none'};
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
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
  border-top-left-radius: 0;
  border-top-right-radius: 0;
`;

export const StyledContainerFlexRow = styled(View)<Partial<StyleProps>>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.mili};
`;

export const TextContainer = styled(View)`
  display: flex;
  flex-shrink: 1;
`;
