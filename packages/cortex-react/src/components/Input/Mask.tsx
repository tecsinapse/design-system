import React, { MutableRefObject, Ref, createRef, useEffect } from 'react';
import { useIMask } from 'react-imask';
import { Input } from '.';
import { InputMaskExpressionProps, InputMaskProps, InputProps } from './types';

const useIMaskLocal = (
  mask: any,
  inputProps: InputProps,
  ref?: React.ForwardedRef<HTMLInputElement>,
  unmaskedRef?: React.MutableRefObject<string>
) => {
  const { ref: iMaskRef, maskRef } = useIMask(mask, {
    onAccept: () => {
      if (unmaskedRef) unmaskedRef.current = maskRef.current.unmaskedValue;
      return inputProps.onChange?.(maskRef.current);
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

export const InputMaskExpression = React.forwardRef<
  HTMLInputElement,
  InputMaskExpressionProps
>(({ mask, unmaskedRef, ...rest }: InputMaskExpressionProps, ref) => {
  const { iMaskRef } = useIMaskLocal({ mask }, rest, ref, unmaskedRef);

  return <Input.Root {...rest} ref={iMaskRef as Ref<HTMLInputElement>} />;
});

export const InputMaskNumber = React.forwardRef<
  HTMLInputElement,
  InputMaskProps
>(({ unmaskedRef, ...rest }: InputMaskProps, ref) => {
  const mask = { mask: Number, scale: 2 };
  const { iMaskRef } = useIMaskLocal(mask, rest, ref, unmaskedRef);

  return <Input.Root {...rest} ref={iMaskRef as Ref<HTMLInputElement>} />;
});

export const InputMaskCurrency = React.forwardRef<
  HTMLInputElement,
  InputMaskProps
>(({ unmaskedRef, ...rest }: InputMaskProps, ref) => {
  const mask = {
    mask: 'R$ num',
    blocks: {
      num: {
        mask: Number,
        scale: 2,
        thousandsSeparator: '.',
        padFractionalZeros: true,
        radix: ',',
        mapToRadix: ['.'],
      },
    },
  };
  const { iMaskRef } = useIMaskLocal(mask, rest, ref, unmaskedRef);

  return <Input.Root {...rest} ref={iMaskRef as Ref<HTMLInputElement>} />;
});
