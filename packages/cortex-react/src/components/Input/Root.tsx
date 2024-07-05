import React from 'react';
import { InputBox } from './Box';
import { InputFace } from './Face';
import { InputProps } from './types';

export const InputRoot = React.forwardRef<HTMLInputElement, InputProps>(
  ({ variants, className, ...rest }, ref) => {
    return (
      <InputFace variants={variants} className={className}>
        <InputBox {...rest} ref={ref} />
      </InputFace>
    );
  }
);
