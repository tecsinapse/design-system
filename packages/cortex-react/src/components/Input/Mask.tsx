import React, { MutableRefObject, Ref, createRef, useEffect } from 'react';
import { useIMask } from 'react-imask';
import { InputRoot } from './Root';
import { InputMaskEvent, InputMaskProps, InputProps, Mask } from './types';

const useIMaskLocal = (
  mask: Mask,
  inputProps: InputProps,
  ref?: React.ForwardedRef<HTMLInputElement>,
  onChangeMask?: (e: InputMaskEvent) => void
) => {
  const { ref: iMaskRef, maskRef } = useIMask(mask, {
    onAccept: (value, mask) => {
      onChangeMask?.({
        unmaskedValue: mask._unmaskedValue,
        value: value,
      });
    },
    ref: ref ? (ref as MutableRefObject<HTMLInputElement>) : createRef(),
  });

  useEffect(() => {
    if (inputProps.value === '') {
      maskRef.current?.updateValue();
    }
  }, [maskRef, inputProps.value]);

  return {
    iMaskRef,
  };
};

export const InputMask = React.forwardRef<HTMLInputElement, InputMaskProps>(
  ({ mask, onChange, ...rest }: InputMaskProps, ref) => {
    const { iMaskRef } = useIMaskLocal(mask, rest, ref, onChange);

    return <InputRoot {...rest} ref={iMaskRef as Ref<HTMLInputElement>} />;
  }
);
