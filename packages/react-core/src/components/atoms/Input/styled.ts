import styled, { css } from '@emotion/native';
import { TextInput } from 'react-native';
import { InputElementProps } from '.';
import {
  RFValueStr,
  StyleProps,
  InputContainerProps,
} from '@tecsinapse/react-core';
import { Icon } from '../Icon';
const leftIconStyles = ({
  leftComponent,
  theme,
}: Partial<InputContainerProps> & StyleProps) =>
  !leftComponent &&
  css`
    padding-left: ${theme.spacing.centi};
  `;

const rightIconStyles = ({
  rightComponent,
  theme,
}: Partial<InputContainerProps> & StyleProps) =>
  !rightComponent &&
  css`
    padding-right: ${theme.spacing.centi};
  `;

const disabledContainerStyles = ({
  disabled,
}: Partial<InputContainerProps> & StyleProps) =>
  disabled &&
  css`
    background-color: transparent;
  `;

export const disabledInputStyles = ({
  disabled,
  theme,
}: Partial<InputContainerProps> & Partial<StyleProps>) =>
  disabled &&
  css`
    color: ${theme?.color.secondary.light};
  `;

const focusedStyles = ({
  focused,
  borderColor = 'secondary',
  theme,
}: Partial<InputContainerProps> & StyleProps) =>
  focused &&
  css`
    border-width: ${theme.borderWidth.nano};
    border-color: ${theme.color[borderColor].dark};
  `;

export const StyledIconContent = styled.View<Partial<StyleProps>>`
  z-index: ${({ theme }) => theme.zIndex.default};
  flex-direction: row;
  align-items: center;
`;

export const StyledInputContainer = styled.View<
  Partial<InputContainerProps> & Partial<StyleProps>
>`
  flex-direction: row;
  align-items: center;
  min-height: ${RFValueStr('44px')};
`;

export const StyledInputElementBase = styled(TextInput)<
  InputElementProps & Partial<StyleProps>
>`
  font-family: ${({ theme }) => `'${theme.font.stack.default}'`};
  font-size: ${({ theme }) => theme.typography.base.fontSize};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  color: ${({ theme }) => theme.font.color.dark};
`;

export const StyledLabelContainer = styled.View<
  Partial<InputContainerProps> & Partial<StyleProps>
>(
  props => css`
    flex: 1;
    padding: ${props.theme.spacing.micro} 0;
    ${leftIconStyles(props)}
    ${rightIconStyles(props)}
  `
);

const StyledBorderKeeperBase = styled.View<
  Partial<InputContainerProps> & Partial<StyleProps>
>`
  background-color: ${({ theme }) => theme.miscellaneous.surfaceColor};
  border-color: ${({
    theme,
    borderColor = 'secondary',
    borderColorGradation = 'light',
  }) => theme.color[borderColor][borderColorGradation]};
  border-radius: ${({ theme }) => theme.borderRadius.mili};
  border-width: ${({ theme }) => theme.borderWidth.pico};
  position: absolute;
  width: 100%;
  height: 100%;
`;

export const StyledBorderKeeper = styled(StyledBorderKeeperBase)<
  Partial<StyleProps>
>(
  props => css`
    ${focusedStyles(props)}
    ${disabledContainerStyles(props)}
  `
);

export const StyledInputElement = styled(StyledInputElementBase)<
  InputElementProps & Partial<StyleProps>
>(
  props => css`
    width: 100%;
    ${disabledInputStyles(props)}
  `
);

export const StyledHintContainer = styled.View<Partial<StyleProps>>`
  margin-top: ${({ theme }) => theme.spacing.micro};
  flex-direction: row;
  align-items: center;
`;

export const StyledHintIcon = styled(Icon)<Partial<StyleProps>>`
  margin-right: ${({ theme }) => theme.spacing.micro};
`;
