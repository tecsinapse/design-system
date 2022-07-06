import styled, { css } from '@emotion/native';
import {
  Button,
  ButtonProps,
  disabledInputStyles,
  Icon,
  InputContainerProps,
  PressableSurface,
  PressableSurfaceProps,
  RFValue,
  RFValueStr,
  StyleProps,
} from '@tecsinapse/react-core';
import { ActivityIndicator, ModalProps, View, ViewProps } from 'react-native';
import { Input, InputNativeProps } from '../../atoms/Input';
import { Text } from '../../atoms/Text';

export const getStyledModal = (safeTop = 0) => {
  return styled(View)<ModalProps & Partial<StyleProps>>`
    padding-top: ${`${RFValue(safeTop)}px`};
    background-color: ${({ theme }) => theme.miscellaneous.bodyColor};
    height: 100%;
  `;
};

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
  height: ${RFValueStr('75px')};
`;

export const CloseButton = styled(Button)<ButtonProps & Partial<StyleProps>>`
  aspect-ratio: 1;
  height: 100%;
`;

export const SearchBarContainer = styled(View)<ViewProps & Partial<StyleProps>>`
  padding: ${({ theme }) => theme.spacing.deca};
  position: relative;
`;

export const SearchBar = styled(Input)<InputNativeProps & Partial<StyleProps>>`
  margin-bottom: ${({ theme }) => theme.spacing.deca};
`;

export const ListItem = styled(PressableSurface)<
  PressableSurfaceProps & Partial<StyleProps>
>`
  border-bottom-width: ${RFValueStr('1px')};
  border-color: ${({ theme }) => theme.color.secondary.light};
  padding-vertical: ${({ theme }) => theme.spacing.mili};
  padding-horizontal: ${({ theme }) => theme.spacing.deca};
`;

export const ModalFooter = styled(View)<Partial<StyleProps>>`
  width: 100%;
  height: auto;
  bottom: 0;
  background-color: ${({ theme }) => theme.miscellaneous.bodyColor};
  padding: ${({ theme }) => theme.spacing.deca};
`;

export const SelectIcon = styled(Icon)<Partial<StyleProps>>`
  padding: ${({ theme }) => theme.spacing.centi};
  color: ${({ theme }) => theme.color.secondary.medium};
`;

export const FetchIndicator = styled(ActivityIndicator)`
  align-self: center;
`;

export const TextTitleModal = styled(Text)<Partial<StyleProps>>`
  max-width: ${RFValue(250)};
  text-align: center;
`;
