import { useTheme } from '@emotion/react';
import { ThemeProp } from '@tecsinapse/react-core';
import React, { FC } from 'react';
import { StyleProp, TextInputProps, TextStyle } from 'react-native';
import { StyledInputElement } from '../styled';

export interface InputElementProps
  extends Omit<TextInputProps, 'onChange' | 'value' | 'ref'> {
  style?: StyleProp<TextStyle>;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  ref?: React.Ref<any>;
}

const InputElement: FC<InputElementProps> = React.forwardRef(
  (
    {
      onChange,
      placeholder,
      value,
      disabled = false,
      placeholderTextColor,
      ...rest
    },
    ref: React.Ref<any>
  ): JSX.Element => {
    const theme = useTheme() as ThemeProp;
    const _placeholderColor = placeholderTextColor || theme.font.color.dark;

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
