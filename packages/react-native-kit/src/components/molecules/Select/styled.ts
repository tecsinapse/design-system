import styled, { css } from '@emotion/native';
import {
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

export const SearchBarContainer = styled(View)<ViewProps & Partial<StyleProps>>`
  padding: ${({ theme }) => theme.spacing.deca};
  position: relative;
`;

export const ListItem = styled(PressableSurface)<
  PressableSurfaceProps & Partial<StyleProps>
>`
  padding-top: ${({ theme }) => theme.spacing.mili};
  padding-bottom: ${({ theme }) => theme.spacing.mili};
  padding-left: ${({ theme }) => theme.spacing.deca};
  padding-right: ${({ theme }) => theme.spacing.deca};
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
  text-align: center;
`;
export const StyledTextItemSelect = styled(Text)`
  width: 90%;
`;

export const Divider = styled(View)<ViewProps & Partial<StyleProps>>`
  height: ${RFValueStr('1px')};
  display: flex;
  flex: 1 1 auto;
  background-color: ${({ theme }) => theme.color.secondary.light};
`;

export const SectionHeader = styled(View)<ViewProps & Partial<StyleProps>>`
  background-color: #fff;
  padding: ${({ theme }) => theme.spacing.deca};
`;
