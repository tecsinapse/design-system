import React from 'react';
import { default as InputStyle } from './styled';
import { ClassNamesProps } from '@emotion/react';

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
  style?: ClassNamesProps;
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
    style,
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
      style={style}
    />
  );
};

export default Input;
