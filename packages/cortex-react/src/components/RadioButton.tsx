import { radioButtonStyles } from '@tecsinapse/cortex-core';
import React, { InputHTMLAttributes } from 'react';

export interface RadioButtonProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  /** if true, label is positioned on left */
  reversed?: boolean;
  /** React ref */
  ref?: React.Ref<HTMLDivElement>;
}

const { container, input, label: labelStyle } = radioButtonStyles();

/** RadioButton component */
export const RadioButton = (
  { label, reversed, id, ref, ...rest }: RadioButtonProps,
) => {
  return (
    <div
      className={container({ reversed })}
      ref={ref}
      data-testid={'radio-button-container'}
    >
      <input id={id} type={'radio'} className={input()} {...rest} />
      {label ? (
        <label htmlFor={id} className={labelStyle()}>
          {label}
        </label>
      ) : (
        <></>
      )}
    </div>
  );
};
