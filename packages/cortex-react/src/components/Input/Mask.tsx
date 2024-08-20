import React, { Ref, useCallback, useEffect } from 'react';
import { useNumberMask, useStringMask } from '../../hooks';
import { InputRoot } from './Root';
import { InputMaskProps } from './types';

export const InputMask = React.forwardRef<HTMLInputElement, InputMaskProps>(
  ({ mask, onChange, value, ...rest }: InputMaskProps, ref) => {
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
      <InputRoot
        {...rest}
        value={_value}
        onChange={e => onChangeValue(e.target.value)}
        ref={ref as Ref<HTMLInputElement>}
      />
    );
  }
);
