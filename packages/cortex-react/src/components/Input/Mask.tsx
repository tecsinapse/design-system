import React, { Ref, useEffect } from 'react';
import { useIMask } from 'react-imask';
import { Input } from '.';
import { InputMaskProps, InputProps } from './types';

export const InputMaskExpression = React.forwardRef<
  HTMLInputElement,
  InputMaskProps
>(({ mask, ...rest }) => {
  const { ref: iMaskRef, maskRef } = useIMask(
    { mask },
    {
      onAccept: () => rest?.onChange?.(maskRef.current),
    }
  );

  useEffect(() => {
    if (rest.value === '') {
      maskRef.current?.updateValue();
    }
  }, [maskRef, rest.value]);

  return <Input.Root {...rest} ref={iMaskRef as Ref<HTMLInputElement>} />;
});

export const InputMaskNumber = React.forwardRef<HTMLInputElement, InputProps>(
  ({ ...rest }) => {
    const { ref: iMaskRef, maskRef } = useIMask(
      { mask: Number, scale: 2 },
      {
        onAccept: () => rest?.onChange?.(maskRef.current),
      }
    );

    useEffect(() => {
      if (rest.value === '') {
        maskRef.current?.updateValue();
      }
    }, [maskRef, rest.value]);

    return <Input.Root {...rest} ref={iMaskRef as Ref<HTMLInputElement>} />;
  }
);

export const InputMaskCurrency = React.forwardRef<HTMLInputElement, InputProps>(
  ({ ...rest }) => {
    const { ref: iMaskRef, maskRef } = useIMask(
      {
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
      },
      {
        onAccept: () => rest?.onChange?.(maskRef.current),
      }
    );

    useEffect(() => {
      if (rest.value === '') {
        maskRef.current?.updateValue();
      }
    }, [maskRef, rest.value]);

    return <Input.Root {...rest} ref={iMaskRef as Ref<HTMLInputElement>} />;
  }
);
