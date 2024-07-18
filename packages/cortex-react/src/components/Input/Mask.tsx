import React, { MutableRefObject, Ref, createRef, useEffect } from 'react';
import { useIMask } from 'react-imask';
import { Input } from '.';
import { InputMaskProps, InputProps } from './types';

const useIMaskLocal = (
  mask: any,
  inputProps: InputProps,
  ref?: React.ForwardedRef<HTMLInputElement>
) => {
  const { ref: iMaskRef, maskRef } = useIMask(mask, {
    onAccept: () => inputProps.onChange?.(maskRef.current),
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
  InputMaskProps
>(({ mask, ...rest }, ref) => {
  const { iMaskRef } = useIMaskLocal({ mask }, rest, ref);

  return <Input.Root {...rest} ref={iMaskRef as Ref<HTMLInputElement>} />;
});

export const InputMaskNumber = React.forwardRef<HTMLInputElement, InputProps>(
  ({ ...rest }, ref) => {
    const mask = { mask: Number, scale: 2 };
    const { iMaskRef } = useIMaskLocal(mask, rest, ref);

    return <Input.Root {...rest} ref={iMaskRef as Ref<HTMLInputElement>} />;
  }
);

export const InputMaskCurrency = React.forwardRef<HTMLInputElement, InputProps>(
  ({ ...rest }, ref) => {
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
    const { iMaskRef } = useIMaskLocal(mask, rest, ref);

    return <Input.Root {...rest} ref={iMaskRef as Ref<HTMLInputElement>} />;
  }
);
