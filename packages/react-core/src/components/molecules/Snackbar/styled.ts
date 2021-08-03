import { View } from 'react-native';
import styled from '@emotion/native';
import { StyleProps } from '@tecsinapse/react-core';
import { SnackbarProps } from './Snackbar';
import { Paper } from '../../atoms/Paper';

export const SnackbarContainer = styled(Paper)<
  Partial<StyleProps & SnackbarProps>
>`
  border-radius: ${({ theme }) => theme.borderRadius.mili};
  background-color: ${({
    theme,
    colorTone = 'xlight',
    colorVariant = 'primary',
  }) => theme.color[colorVariant][colorTone]};
  bottom: 8px;
  left: ${({ theme }) => theme.spacing.deca};
  right: ${({ theme }) => theme.spacing.deca};
  padding: ${({ theme }) => theme.spacing.mili};
  position: absolute;
  z-index: ${({ theme }) => theme.zIndex.modal};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ContentContainer = styled(View)`
  flex-direction: row;
  display: flex;
  align-items: center;
`;

export const IconContainer = styled(View)<Partial<StyleProps>>`
  flex-direction: row;
  display: flex;
  align-items: center;
  margin-right: ${({ theme }) => theme.spacing.mili};
`;
