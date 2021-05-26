import React, { FC } from 'react';
import { StyleProp, TextStyle } from 'react-native';
import { Mask } from '../hooks/useMask';
import { StyledInputElement } from '../styled';
export interface InputElementProps {
  style?: StyleProp<TextStyle>
  /**
   * TODO:
   */
  value?: string | Mask;
  placeholder?: string;
  defaultValue?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

const InputElement: FC<InputElementProps> = ({
  onChange,
  placeholder,
  value,
  defaultValue,
  disabled = false,
  ...rest
}): JSX.Element => {

  const _value = typeof value === 'string' ? value : value?.maskValue?.formatted
  const _defaultValue = typeof value === 'string' ? defaultValue : value?.converter?.(defaultValue).formatted

  return (
    <StyledInputElement
      {...rest}
      onChangeText={onChange}
      value={_value}
      placeholder={placeholder}
      defaultValue={_defaultValue}
      disabled={disabled}
      editable={!disabled}
    />
  );
};

export default InputElement;