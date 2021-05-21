import React, { FC } from 'react';
import { StyleProp, TextStyle } from 'react-native';
import { StyledInputElement } from '../styled';

export interface InputElementProps {
  style?: StyleProp<TextStyle>
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
}

const InputElement: FC<InputElementProps> = ({
  onChange,
  placeholder,
  type = 'default',
  value,
  defaultValue,
  disabled = false,
  ...rest
}): JSX.Element => {

  return (
    <StyledInputElement
      {...rest}
      onChangeText={onChange}
      value={value}
      placeholder={placeholder}
      keyboardType={type}
      defaultValue={defaultValue}
      editable={!disabled}
    />
  );
};

export default InputElement;