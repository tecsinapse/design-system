import {
  styleInputElement,
  styleLabelElement,
  toggle,
} from '@tecsinapse/cortex-core';
import React, { InputHTMLAttributes, forwardRef } from 'react';

/** Toggle component */
export const Toggle = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>((props: InputHTMLAttributes<HTMLInputElement>, ref) => {
  return (
    <div
      className={'flex flex-row items-center gap-x-centi'}
      data-testid="toggle-div"
    >
      <label className={styleLabelElement()}>
        <input
          type="checkbox"
          className={styleInputElement()}
          ref={ref}
          data-testid="toggle-input"
          {...props}
        />
        <div className={toggle()} />
      </label>
    </div>
  );
});
