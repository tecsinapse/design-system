import { useTheme } from '@emotion/react';
import { ThemeProp } from '@tecsinapse/react-core';
import React, { FC, useEffect, useState } from 'react';
import { StyleProp, TextInputProps, TextStyle } from 'react-native';
import { StyledInputElement } from '../styled';
import { MaskType, useStringMask } from '../hooks/useStringMask';
import { CurrencyOptions, useNumberMask } from '../hooks/useNumberMask';

export interface InputElementProps
  extends Omit<TextInputProps, 'onChange' | 'value' | 'ref'> {
  style?: StyleProp<TextStyle>;
  /**
   * TODO:
   */
  value: string;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (raw: string, formatted?: string) => void;
  mask?: (MaskType[] | ((value: string) => MaskType[])) | CurrencyOptions;
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
      mask,
      ...rest
    },
    ref: React.Ref<any>
  ): JSX.Element => {
    const theme = useTheme() as ThemeProp;
    const _placeholderColor = placeholderTextColor || theme.font.color.dark;

    const [maskValue, setMaskValue] =
      mask === undefined
        ? useState<string>(value)
        : Array.isArray(mask) || typeof mask === 'function'
        ? useStringMask(mask, value)
        : useNumberMask(mask);

    useEffect(() => {
      if (onChange) {
        if (typeof maskValue === 'string') onChange(maskValue);
        else onChange(maskValue?.raw, maskValue?.formatted ?? '');
      }
    }, [maskValue]);

    const onChangeValue = (value: string) => {
      setMaskValue(value);
    };

    return (
      <StyledInputElement
        {...rest}
        ref={ref}
        onChangeText={onChangeValue}
        value={
          typeof maskValue === 'string' ? maskValue : maskValue?.formatted ?? ''
        }
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
