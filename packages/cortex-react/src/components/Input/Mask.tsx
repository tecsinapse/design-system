import React, { MutableRefObject, Ref, createRef, useEffect } from 'react';
import { useIMask } from 'react-imask';
import { InputRoot } from './Root';
import { InputMaskProps } from './types';

export const InputMask = React.forwardRef<HTMLInputElement, InputMaskProps>(
  ({ mask, onChange, value, controlled, ...rest }: InputMaskProps, ref) => {
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
      if (value && controlled) {
        setUnmaskedValue(String(value));
        maskRef.current?.updateValue();
      }
    }, [value, controlled]);

    return <InputRoot {...rest} ref={iMaskRef as Ref<HTMLInputElement>} />;
  }
);
