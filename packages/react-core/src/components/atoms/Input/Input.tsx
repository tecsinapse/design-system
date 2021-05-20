import { ColorType } from '@tecsinapse/react-core';
import React, { FC } from 'react';
import { StyleProp, TextStyle } from 'react-native';
import { StyledInput } from './styled';

export interface InputProps {
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
  onChange?: (value: string) => void;
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
  onBlur,
  style,
  ...rest
}): JSX.Element => {

  const [ focused, setFocused ] = React.useState<boolean>(false);

  const handleFocus = () => {
    console.log("focus")
    setFocused(true);
    onFocus && onFocus()
  }

  const handleBlur = () => {
    console.log("blur")
    setFocused(false);
    onBlur && onBlur()
  }

  return (
    <StyledInput
      {...rest}
      onChangeText={onChange}
      value={value}
      placeholder={placeholder}
      keyboardType={type}
      defaultValue={defaultValue}
      editable={!disabled}
      onFocus={handleFocus}
      onBlur={handleBlur}
      focused={focused}
      style={style}
    />
  );
};

export default Input;
