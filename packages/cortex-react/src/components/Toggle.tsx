import {
  styleInputElement,
  styleLabelElement,
  toggle,
} from '@tecsinapse/cortex-core';
import React, { InputHTMLAttributes } from 'react';

export interface ToggleProps extends InputHTMLAttributes<HTMLInputElement> {
  /** React ref */
  ref?: React.Ref<HTMLInputElement>;
}

/** Toggle component */
export const Toggle = (props: ToggleProps) => {
  const { ref, ...rest } = props;
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
          {...rest}
        />
        <div className={toggle()} />
      </label>
    </div>
  );
};
