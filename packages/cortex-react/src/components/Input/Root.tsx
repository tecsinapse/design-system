import React from 'react';
import { InputBox } from './Box';
import { InputFace } from './Face';
import { InputProps } from './types';

/** Default Input component. */
export const InputRoot = React.forwardRef<HTMLInputElement, InputProps>(
  ({ variants, className, ...rest }: InputProps, ref) => {
    return (
      <InputFace variants={variants} className={className}>
        <InputBox {...rest} ref={ref} />
      </InputFace>
    );
  }
);
