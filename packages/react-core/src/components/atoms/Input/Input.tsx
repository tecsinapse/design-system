import React from 'react';
import { default as InputStyle } from './styled';

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
    <InputStyle
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

export default Input;
