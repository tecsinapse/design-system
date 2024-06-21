import clsx from 'clsx';
import React, { ReactNode } from 'react';
import { groupButton } from '../styles';

export interface GroupButtonValue<T> {
  value: T;
}

export interface GroupButtonProps<T> {
  value: T;
  options: GroupButtonValue<T>[];
  renderKey: (option?: T) => string | number;
  renderOption: (option: T) => ReactNode;
  onChange: (option: T) => void;
  /** Custom styles to groupButton
   * Obs: To style of firstButton and lastButton to be applied use prefix "first:" or "last:" before each style, respectively.
   * */
  customStyles?: {
    active?: string;
    firstButton?: string;
    lastButton?: string;
    inactive?: string;
    disabled?: string;
  };
  disableAllOptions?: boolean;
}

const { button, container, active, inactive, firstButton, lastButton } =
  groupButton();

export const GroupButton = <T,>(props: GroupButtonProps<T>) => {
  const { options, value, renderKey, renderOption, onChange, customStyles } =
    props;

  return (
    <div className={container()}>
      {options.map(option => {
        const key = renderKey?.(option.value);
        const isActive = key === renderKey?.(value);
        return (
          <button
            value={String(value)}
            onClick={() => onChange(option.value)}
            className={clsx(
              button(),
              firstButton({ className: customStyles?.firstButton }),
              lastButton({ className: customStyles?.lastButton }),
              !isActive && inactive({ className: customStyles?.inactive }),
              isActive && active({ className: customStyles?.active })
            )}
            key={key}
          >
            {renderOption(option.value)}
          </button>
        );
      })}
    </div>
  );
};
