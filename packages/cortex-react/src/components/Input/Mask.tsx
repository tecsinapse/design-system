import React, { MutableRefObject, Ref, createRef, useEffect } from 'react';
import { useIMask } from 'react-imask';
import { InputRoot } from './Root';
import { InputMaskProps } from './types';

export const InputMask = React.forwardRef<HTMLInputElement, InputMaskProps>(
  ({ mask, onChange, value, ...rest }: InputMaskProps, ref) => {
    const {
      ref: iMaskRef,
      setUnmaskedValue,
      maskRef,
    } = useIMask(mask, {
      onAccept: (value, mask) => {
        onChange?.({
          unmaskedValue: mask._unmaskedValue,
          value: value,
        });
      },
      ref: ref ? (ref as MutableRefObject<HTMLInputElement>) : createRef(),
      defaultValue: String(value ?? ''),
    });

    useEffect(() => {
      if (value !== undefined) {
        setUnmaskedValue(String(value));
        maskRef.current?.updateValue();
      }
    }, [value]);

    return <InputRoot {...rest} ref={iMaskRef as Ref<HTMLInputElement>} />;
  }
);
