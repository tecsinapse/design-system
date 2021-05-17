import React, { FC } from 'react';
import { StyledInput } from './styled';
import { StyleProp, TextStyle } from 'react-native';
import { ColorType } from '@tecsinapse/react-core';

export interface InputProps {
  onChange?: (value: string) => void;
  value?: string;
  placeholder?: string;
  type?:
    | 'default'
    | 'number-pad'
    | 'decimal-pad'
    | 'numeric'
    | 'email-address'
    | 'phone-pad';
  defaultValue?: string;
  disabled?: boolean;
  focused?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  style?: StyleProp<TextStyle>;
  color?: ColorType;
}

const Input: FC<InputProps> = ({
  onChange,
  placeholder,
  type = 'default',
  value,
  defaultValue,
  disabled = false,
  onFocus,
  focused,
  onBlur,
  style,
  color = 'primary',
  ...rest
}): JSX.Element => {
  return (
    <StyledInput
      {...rest}
      onChangeText={onChange}
      value={value}
      placeholder={placeholder}
      keyboardType={type}
      defaultValue={defaultValue}
      editable={!disabled}
      onFocus={onFocus}
      onBlur={onBlur}
      focused={focused}
      color={color}
      style={style}
    />
  );
};

export default Input;
