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
}

const Input = (props: InputProps): JSX.Element => {
  const {
    onChange,
    placeholder,
    type = 'default',
    value,
    defaultValue,
    disabled = false,
  } = props;

  return (
    <StyledInput
      onChangeText={onChange}
      value={value}
      placeholder={placeholder}
      keyboardType={type}
      defaultValue={defaultValue}
      editable={!disabled}
    />
  );
};

const StyledInput = styled(TextInput)`
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
    `}
`;

export default Input;
