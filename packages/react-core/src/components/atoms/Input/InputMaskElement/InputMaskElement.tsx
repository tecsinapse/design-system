import { useTheme } from '@emotion/react';
import { ThemeProp } from '../../../../types/defaults';
import React, { useCallback, useEffect } from 'react';
import { StyleProp, TextInput, TextInputProps, TextStyle } from 'react-native';
import { StyledInputElement } from '../styled';
import { MaskType, useStringMask } from '../hooks/useStringMask';
import { CurrencyOptions, useNumberMask } from '../hooks/useNumberMask';

export interface InputMaskElementProps
  extends Omit<TextInputProps, 'onChange' | 'value' | 'ref'> {
  style?: StyleProp<TextStyle>;
  value?: string | number;
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
}

const InputMaskElement = React.forwardRef<TextInput, InputMaskElementProps>(
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
    ref
  ): React.ReactElement => {
    const theme = useTheme() as ThemeProp;

    const _placeholderColor = placeholderTextColor || theme.font.color.dark;

    const getInputHook = (value: string | number) => {
      if (mask !== undefined) {
        if (Array.isArray(mask) || typeof mask === 'function') {
          return useStringMask(mask, value);
        } else {
          return useNumberMask(mask, value);
        }
      } else {
        return [undefined, undefined];
      }
    };

    const [maskValue, setMaskValue] = getInputHook(value ?? '');

    const _value =
      maskValue === undefined
        ? value?.toString()
        : maskValue.formatted
          ? maskValue.formatted
          : '';

    useEffect(() => {
      if (onChange) {
        onChange(maskValue?.raw);
      }
    }, [maskValue]);

    const onChangeValue = useCallback(
      (value: string | number) => {
        if (maskValue !== undefined && setMaskValue !== undefined) {
          setMaskValue(value);
        } else onChange?.(value);
      },
      [value]
    );

    useEffect(() => {
      /** Used to reinitialize maskValue when the value is updated in the parent component **/
      if (
        maskValue !== undefined &&
        setMaskValue !== undefined &&
        value !== undefined &&
        typeof maskValue === 'object'
      ) {
        /** Case there is a mask **/
        if (
          maskValue.raw !== undefined &&
          maskValue.raw.toString() !== value.toString()
        ) {
          onChangeValue(value);
        }
      } else if (maskValue === undefined && value !== undefined) {
        onChangeValue(value);
      }
    }, [value]);

    return (
      <StyledInputElement
        {...rest}
        ref={ref}
        onChangeText={onChangeValue}
        value={_value}
        placeholder={placeholder}
        placeholderTextColor={_placeholderColor}
        disabled={disabled}
        editable={!disabled}
      />
    );
  }
);

InputMaskElement.displayName = 'InputMaskElement';

export default InputMaskElement;
