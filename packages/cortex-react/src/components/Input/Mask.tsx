import React, { MutableRefObject, createRef, useCallback } from 'react';
import { useIMask } from 'react-imask';
import { InputRoot } from './Root';
import { InputMaskEvent, InputMaskProps, InputProps, Mask } from './types';

const useIMaskLocal = (
  mask: Mask,
  inputProps: InputProps,
  ref?: React.ForwardedRef<HTMLInputElement>,
  onChangeMask?: (e: InputMaskEvent) => void
) => {
  const {
    ref: iMaskRef,
    maskRef,
    value,
    unmaskedValue,
    setValue,
    setUnmaskedValue,
  } = useIMask(mask, {
    onAccept: (value, mask) => {
      onChangeMask?.({
        unmaskedValue: mask._unmaskedValue,
        value: value,
      });
      setValue(value);
    },
    ref: ref ? (ref as MutableRefObject<HTMLInputElement>) : createRef(),
    // defaultValue: String(inputProps.value ?? ''),
  });

  const inputOnChange = useCallback(() => {
    onChangeMask?.({
      unmaskedValue: unmaskedValue,
      value: value,
    });
  }, []);

  // useEffect(() => {
  //   if (inputProps.value === '') {
  //     maskRef.current?.updateValue();
  //   }
  // }, [maskRef, inputProps.value]);

  // useEffect(() => {
  //   onChangeMask?.({
  //     value,
  //     unmaskedValue,
  //   });
  // }, [value, unmaskedValue]);

  return {
    iMaskRef,
    value,
    inputOnChange,
  };
};

export const InputMask = React.forwardRef<HTMLInputElement, InputMaskProps>(
  ({ mask, onChange, ...rest }: InputMaskProps, ref) => {
    const { iMaskRef, value, inputOnChange } = useIMaskLocal(
      mask,
      rest,
      ref,
      onChange
    );

    console.log('VALUE', value);
    console.log('REST VALUE', rest.value);

    return (
      <InputRoot
        // {...rest}
        value={value}
        onChange={() => {}}
        // onChange={e => console.log('TARGET', e.target.value)}
        // ref={iMaskRef as Ref<HTMLInputElement>}
      />
    );
  }
);
