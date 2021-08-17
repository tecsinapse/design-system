import styled, { css } from '@emotion/native';
import {
  Button,
  ButtonProps,
  disabledInputStyles,
  Icon,
  InputContainerProps,
  PressableSurface,
  PressableSurfaceProps,
  StyleProps,
} from '@tecsinapse/react-core';
import { ModalProps, View, ViewProps } from 'react-native';
import { Input, InputNativeProps } from '../Input';
import { Text } from '../Text';

export const StyledModal = styled(View)<ModalProps & Partial<StyleProps>>`
  position: relative;
  background-color: ${({ theme }) => theme.miscellaneous.bodyColor};
  height: 100%;
  width: 100%;
`;

export const StyledSelectionText = styled(Text)(
  (props: Partial<InputContainerProps> & Partial<StyleProps>) => css`
    line-height: ${props.theme?.typography.h5.lineHeight};
    ${disabledInputStyles(props)};
  `
);

export const Dummy = styled(View)`
  aspect-ratio: 1;
  height: 100%;
`;

export const StyledPressableSurface = styled(
  PressableSurface
)<PressableSurfaceProps>`
  width: 100%;
`;

export const Header = styled(View)<ViewProps & Partial<StyleProps>>`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.deca};
  height: 75px;
`;

export const CloseButton = styled(Button)<ButtonProps & Partial<StyleProps>>`
  aspect-ratio: 1;
  height: 100%;
`;

export const SearchBarContainer = styled(View)<ViewProps & Partial<StyleProps>>`
  padding: ${({ theme }) => theme.spacing.deca};
`;

export const SearchBar = styled(Input)<InputNativeProps & Partial<StyleProps>>`
  margin-bottom: ${({ theme }) => theme.spacing.deca};
`;

export const ListItem = styled(PressableSurface)<
  PressableSurfaceProps & Partial<StyleProps>
>`
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.color.secondary.light};
  padding-vertical: ${({ theme }) => theme.spacing.mili};
  padding-horizontal: ${({ theme }) => theme.spacing.deca};
`;

export const ListFooter = styled.View<Partial<StyleProps>>`
  width: 100%;
  min-height: 44px;
  margin-vertical: ${({ theme }) => theme.spacing.deca};
`;

export const FloatingButton = styled(Button)<ButtonProps & Partial<StyleProps>>`
  position: absolute;
  bottom: ${({ theme }) => theme.spacing.deca};
  left: ${({ theme }) => theme.spacing.deca};
  right: ${({ theme }) => theme.spacing.deca};
`;

export const SelectIcon = styled(Icon)<Partial<StyleProps>>`
  padding: ${({ theme }) => theme.spacing.centi};
  color: ${({ theme }) => theme.color.secondary.medium};
`;
