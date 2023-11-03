import React from 'react';
import { StyleProp, TextInput, TextInputProps, TextStyle } from 'react-native';
import { StyledInputElement } from '../styled';
import { useTheme } from '../../../../hooks';

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
      ...rest
    },
    ref
  ): JSX.Element => {
    const theme = useTheme();
    const _placeholderColor = placeholderTextColor || theme.font?.color?.dark;

    return (
      <StyledInputElement
        {...rest}
        ref={ref}
        onChangeText={onChange}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={_placeholderColor}
        disabled={disabled}
        editable={!disabled}
      />
    );
  }
);

InputElement.displayName = 'InputElement';

export default InputElement;
