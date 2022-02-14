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
  value: string | number;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (value: any) => void;
  /**
   To use mask for strings you have to pass a MaskType[] or ((value: string) => MaskType[])
   A MaskType can be a string, RegExp, or Array<RegExp>.
   In case we have a string, '9' represents digits, 'a' represents alphabet characters, and any other character represents fixed characters in the mask.
   For example a phone mask can be represented as ['(99) \\99999-9999'], or ['(99) ', '/[9]/', '9999-9999'], or ['(', /[0-9]/, /[0-9]/, ') ', '/[9]/', '9999-9999'] and many others.
   To use mask for numbers you have to pass a CurrencyOptions object
   A CurrencyOptions object contains symbol, separator, decimal, precision. For example {symbol: 'R$ ', separator: '.', decimal: ',', precision: 2,}.
   **/
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
        ? useState<string>(String(value))
        : Array.isArray(mask) || typeof mask === 'function'
        ? useStringMask(mask, String(value))
        : useNumberMask(mask, value);

    useEffect(() => {
      if (onChange) {
        if (typeof maskValue === 'string') onChange(maskValue);
        else onChange(maskValue?.raw);
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
