import React from 'react';
import { TextInput, Platform } from 'react-native';
import styled, { css } from '@emotion/native';

export interface InputProps {
  onChange: (value: string | number) => void;
  value: string | number;
  placeholder?: string;
  type?:
    | 'default'
    | 'number-pad'
    | 'decimal-pad'
    | 'numeric'
    | 'email-address'
    | 'phone-pad';
  defaultValue?: string | number;
  disabled?: boolean;
  focused?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
}

const Input = (props: InputProps): JSX.Element => {
  const {
    onChange,
    placeholder,
    type = 'default',
    value,
    defaultValue,
    disabled = false,
    onFocus,
    focused,
    onBlur,
  } = props;

  return (
    <StyledInput
      onChangeText={onChange}
      value={value}
      placeholder={placeholder}
      keyboardType={type}
      defaultValue={defaultValue}
      editable={!disabled}
      onFocus={onFocus}
      onBlur={onBlur}
      focused={focused}
    />
  );
};

const baseStyled = ({ theme }) => css`
  padding: 10px;
  border-color: ${theme.primary.main};
  border-radius: 4px;
`;
const StyledInput = styled(TextInput)`
  ${props => baseStyled(props)};
  border-width: 1px;
  padding: 10px;
  border-color: ${({ theme }) => theme.primary.main};
  border-radius: 4px;
  ${({ theme }) =>
    Platform.OS === 'web' &&
    css`
      &:focus {
        outline-width: 2px;
        outline-color: ${theme.primary.main};
      }
    `},
  ${({ focused, theme }) =>
    focused &&
    css`
      border-width: 2px;
      ${baseStyled({ theme })};
    `},
`;

export default Input;
