import clsx from 'clsx';
import React, { ReactNode } from 'react';
import { groupButton } from '../styles/groupButton';

export interface GroupButtonValue<T> {
  value: T;
}

interface GroupButtonProps<T> {
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
  };
  // // buttonSize?: ButtonSizeType;
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
        const isActive = value === option.value;
        return (
          <button
            value={String(value)}
            onClick={() => onChange(option.value)}
            className={clsx(
              button(),
              firstButton({ className: `first:${customStyles?.firstButton}` }),
              lastButton({ className: `last:${customStyles?.lastButton}` }),
              inactive({ className: customStyles?.inactive }),
              isActive && active({ className: customStyles?.active })
            )}
            key={renderKey(option.value)}
          >
            {renderOption(option.value)}
          </button>
        );
      })}
    </div>
  );
};
