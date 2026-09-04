import React from 'react';
import { StyleProp, TextInput, TextInputProps, TextStyle } from 'react-native';
import { cn } from '@tecsinapse/cortex-core';
import { useCSSVariable } from 'uniwind';
import {
  inputElementClasses,
  inputElementDisabledClasses,
} from '../../../styles/input';

export interface InputElementProps
  extends Omit<TextInputProps, 'onChange' | 'value' | 'ref'> {
  style?: StyleProp<TextStyle>;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  ref?: React.Ref<TextInput>;
}

const InputElement = ({
  onChange,
  placeholder,
  value,
  disabled = false,
  placeholderTextColor,
  style,
  className,
  ref,
  ...rest
}: InputElementProps): React.ReactElement => {
  const contentHigh = useCSSVariable('--color-content-high') as string;
  const _placeholderColor = placeholderTextColor || contentHigh;

  return (
    <TextInput
      {...rest}
      ref={ref}
      className={cn(
        inputElementClasses,
        disabled && inputElementDisabledClasses,
        className,
      )}
      onChangeText={onChange}
      value={value}
      placeholder={placeholder}
      placeholderTextColor={_placeholderColor}
      editable={!disabled}
      style={style}
    />
  );
};

export default InputElement;
