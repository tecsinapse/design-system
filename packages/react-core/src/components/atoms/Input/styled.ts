import styled, { css } from '@emotion/native';
import { InputElementProps, StyleProps } from '@tecsinapse/react-core';
import { TextInput } from 'react-native';
import { InputContainerProps } from './InputContainer/InputContainer';

const focusedStyles = ({
  focused,
  theme,
}: Partial<InputContainerProps> & StyleProps) =>
  focused &&
  css`
    border-width: ${theme.borderWidth.nano};
    border-color: ${theme.color.secondary.dark};
  `;

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
  theme,
}: Partial<InputContainerProps> & StyleProps) =>
  disabled &&
  css`
    background-color: transparent;
  `;

const disabledInputStyles = ({
  disabled,
  theme,
}: Partial<InputContainerProps> & StyleProps) =>
  disabled &&
  css`
    color: ${theme.color.secondary.light};
  `;

const StyledInputContainerBase = styled.View<
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
  padding-top: ${({ theme }) => theme.spacing.micro};
  padding-bottom: ${({ theme }) => theme.spacing.micro};
  flex-direction: row;
  align-items: center;
  min-height: 44px;
`;

export const StyledInputElementBase = styled(TextInput)<
  InputElementProps & Partial<StyleProps>
>`
  font-size: ${({ theme }) => theme.typography.base.fontSize};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  color: ${({ theme }) => theme.font.color.dark};
`;

export const StyledLabelContainer = styled.View<Partial<StyleProps>>`
  flex: 1;
`;

export const StyledBorderKeeper = styled.View<
  Partial<InputContainerProps> & Partial<StyleProps>
>`
  padding: ${({ theme, focused }) => (focused ? 0 : theme.borderWidth.pico)};
  justify-content: center;
  align-items: center;
`;

export const StyledInputContainer = styled(StyledInputContainerBase)<
  Partial<StyleProps>
>(
  props => css`
    ${focusedStyles(props)}
    ${leftIconStyles(props)}
  ${rightIconStyles(props)}
  ${disabledContainerStyles(props)}
  `
);

export const StyledInputElement = styled(StyledInputElementBase)<
  InputElementProps & Partial<StyleProps>
>(
  props => css`
    ${disabledInputStyles(props)}
  `
);
