import styled from '@emotion/native';
import { ModalProps, View, ViewProps } from 'react-native';
import {
  Button,
  ButtonProps,
  PressableSurface,
  PressableSurfaceProps,
  StyleProps,
} from '@tecsinapse/react-core';
import { Input, InputNativebProps } from '../Input';

export const StyledModal = styled(View)<ModalProps & Partial<StyleProps>>`
  background-color: ${({ theme }) => theme.miscellaneous.bodyColor};
  height: 100%;
  width: 100%;
`;

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

export const SearchBar = styled(Input)<InputNativebProps & Partial<StyleProps>>`
  margin-bottom: ${({ theme }) => theme.spacing.deca};
`;

export const ListItem = styled(PressableSurface)<
  PressableSurfaceProps & Partial<StyleProps>
>`
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.color.secondary.light};
  padding-vertical: ${({ theme }) => theme.spacing.mili};
`;
