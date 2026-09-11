import React, { useEffect } from 'react';
import { StyleProp, TextInput, TextInputProps, TextStyle } from 'react-native';
import { useCSSVariable } from 'uniwind';
import {
  inputElementClasses,
  inputElementDisabledClasses,
} from '../../../styles/input';
import {
  cn,
  CurrencyOptions,
  MaskType,
  useNumberMask,
  useStringMask,
} from '@tecsinapse/cortex-core';

export interface InputMaskElementProps
  extends Omit<TextInputProps, 'onChange' | 'value' | 'ref'> {
  style?: StyleProp<TextStyle>;
  value?: string | number;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (value: string | number) => void;
  mask?: (MaskType[] | ((value: string) => MaskType[])) | CurrencyOptions;
  onFocus?: () => void;
  onBlur?: () => void;
  ref?: React.Ref<TextInput>;
}

const StringMaskInput = ({
  mask,
  value,
  onChange,
  ref,
  ...rest
}: InputMaskElementProps) => {
  const [maskValue, setMaskValue] = useStringMask(
    mask as MaskType[] | ((value: string) => MaskType[]),
    value ?? ''
  );

  useEffect(() => {
    if (onChange && maskValue?.raw !== undefined) {
      onChange(maskValue.raw);
    }
  }, [maskValue]);

  const _value =
    maskValue?.formatted !== undefined ? maskValue.formatted : '';

  return (
    <TextInput
      {...rest}
      ref={ref}
      onChangeText={setMaskValue}
      value={_value}
    />
  );
};

const NumberMaskInput = ({
  mask,
  value,
  onChange,
  ref,
  ...rest
}: InputMaskElementProps) => {
  const [maskValue, setMaskValue] = useNumberMask(
    mask as CurrencyOptions,
    value ?? ''
  );

  useEffect(() => {
    if (onChange && maskValue?.raw !== undefined) {
      onChange(maskValue.raw);
    }
  }, [maskValue]);

  const _value =
    maskValue?.formatted !== undefined ? maskValue.formatted : '';

  return (
    <TextInput
      {...rest}
      ref={ref}
      onChangeText={setMaskValue}
      value={_value}
    />
  );
};

const InputMaskElement = ({
  onChange,
  placeholder,
  value,
  disabled = false,
  placeholderTextColor,
  mask,
  style,
  className,
  ref,
  ...rest
}: InputMaskElementProps): React.ReactElement => {
  const contentHigh = useCSSVariable('--color-content-high') as string;
  const _placeholderColor = placeholderTextColor || contentHigh;

  const isNumberMask =
    mask !== undefined &&
    !Array.isArray(mask) &&
    typeof mask !== 'function';

  const sharedProps = {
    mask,
    value,
    onChange,
    placeholder,
    placeholderTextColor: _placeholderColor,
    editable: !disabled,
    style,
    className: cn(
      inputElementClasses,
      disabled && inputElementDisabledClasses,
      className,
    ),
  };

  return (
    <>
      {isNumberMask ? (
        <NumberMaskInput {...sharedProps} {...rest} ref={ref} />
      ) : (
        <StringMaskInput {...sharedProps} {...rest} ref={ref} />
      )}
    </>
  );
};

export default InputMaskElement;
