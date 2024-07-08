import { inputBox, labelStyle } from '@tecsinapse/cortex-core';
import clsx from 'clsx';
import React from 'react';
import { InputProps } from './types';

export const InputBox = React.forwardRef<HTMLInputElement, InputProps>(
  ({ id, name, variants, label, placeholder, className, ...rest }, ref) => {
    return (
      <div className={'flex w-full flex-col'}>
        <input
          id={id ?? name}
          name={name}
          placeholder={placeholder ?? ' '}
          className={clsx(inputBox(placeholder, label, className))}
          {...rest}
          ref={ref}
          data-testid="input-box"
        />
        <label
          htmlFor={id ?? name}
          className={labelStyle({ intent: variants?.intent, placeholder })}
          data-testid="input-label"
        >
          {label}
        </label>
      </div>
    );
  }
);
