import React from 'react';
import { StyleProp, TextInput, TextInputProps, TextStyle } from 'react-native';
import { clsx } from 'clsx';
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
}

const InputElement = React.forwardRef<TextInput, InputElementProps>(
  (
    {
      onChange,
      placeholder,
      value,
      disabled = false,
      placeholderTextColor,
      style,
      ...rest
    },
    ref
  ): React.ReactElement => {
    const contentHigh = useCSSVariable('--color-content-high') as string;
    const _placeholderColor = placeholderTextColor || contentHigh;

    return (
      <TextInput
        {...rest}
        ref={ref}
        className={clsx(
          inputElementClasses,
          disabled && inputElementDisabledClasses,
        )}
        onChangeText={onChange}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={_placeholderColor}
        editable={!disabled}
        style={style}
      />
    );
  },
);

InputElement.displayName = 'InputElement';

export default InputElement;
