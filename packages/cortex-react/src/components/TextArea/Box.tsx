import { inputBox, labelStyle } from '@tecsinapse/cortex-core';
import clsx from 'clsx';
import React from 'react';
import { TextAreaProps } from './types';

export const TextAreaBox = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      id,
      name,
      variants,
      label,
      placeholder,
      rows,
      className,
      ...rest
    }: TextAreaProps,
    ref
  ) => {
    return (
      <div className="flex w-full flex-col">
        <textarea
          data-testid={'textarea-box'}
          ref={ref}
          id={id ?? name}
          name={name}
          placeholder={placeholder ?? ' '}
          className={clsx(
            inputBox(placeholder, label, className),
            'resize-none mt-mili'
          )}
          rows={rows}
          {...rest}
        />
        <label
          htmlFor={id ?? name}
          className={labelStyle({
            intent: variants?.intent,
            placeholder,
          })}
        >
          {label}
        </label>
      </div>
    );
  }
);
