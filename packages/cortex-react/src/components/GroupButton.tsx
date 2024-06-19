import clsx from 'clsx';
import React, { ReactNode } from 'react';
import { groupButton } from '../styles/groupButton';

export interface GroupButtonValue<T> {
  value: T;
}

export interface GroupButtonProps<T> {
  value: T;
  options: GroupButtonValue<T>[];
  renderKey: (option?: T) => string | number | undefined;
  renderOption: (option: T) => ReactNode;
  onChange: (option: T) => void;
  customStyles?: {
    active?: string;
    firstButton?: string;
    lastButton?: string;
    inactive?: string;
    disabled?: string;
  };
  disableAllOptions?: boolean;
}
export const GroupButton = <T,>(props: GroupButtonProps<T>) => {
  const { options, value, renderKey, renderOption, onChange, customStyles } =
    props;

  const { button, container, active, inactive, firstButton, lastButton } =
    groupButton();
  return (
    <div className={container()}>
      {options.map(option => {
        const key = renderKey?.(option.value);
        const isActive = key === renderKey?.(value);
        return (
          <button
            disabled={true}
            value={String(value)}
            onClick={() => onChange(option.value)}
            className={clsx(
              button(),
              firstButton({ className: `first:${customStyles?.firstButton}` }),
              lastButton({ className: `last:${customStyles?.lastButton}` }),
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
