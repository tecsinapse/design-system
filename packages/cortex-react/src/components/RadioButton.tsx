import { radioButtonStyles } from '@tecsinapse/cortex-core';
import React, { InputHTMLAttributes, forwardRef } from 'react';

export interface RadioButtonProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  /** if true, label is positioned on left */
  reversed?: boolean;
}

const { container, input, label: labelStyle } = radioButtonStyles();

/** RadioButton component */
export const RadioButton = forwardRef<HTMLDivElement, RadioButtonProps>(
  ({ label, reversed, id, ...rest }: RadioButtonProps, ref) => {
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
  }
);
