import React, { forwardRef, InputHTMLAttributes } from 'react';
import {
  styleInputElement,
  styleLabelElement,
  toggle,
} from '@tecsinapse/cortex-core';

export const Toggle = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {
  return (
    <div className={'flex flex-row items-center gap-x-centi'}>
      <label className={styleLabelElement()}>
        <input
          type="checkbox"
          className={styleInputElement()}
          ref={ref}
          {...props}
        />
        <div className={toggle()} />
      </label>
    </div>
  );
});
