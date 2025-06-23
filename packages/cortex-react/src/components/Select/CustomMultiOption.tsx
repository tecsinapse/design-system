import { checkbox, option as styleOption } from '@tecsinapse/cortex-core';
import React from 'react';
import { CustomMultiOptionProps } from './types';
import { useMultiSelectOption } from './useMultiSelectOption';

export const SelectCustomMultiOption = <T,>({
  onSelect,
  option,
  grouped = false,
  children,
}: CustomMultiOptionProps<T>) => {
  const { onClickOption, isChecked, inputRef } = useMultiSelectOption(
    option,
    onSelect
  );

  return (
    <li
      onClick={onClickOption}
      className={styleOption({ grouped })}
      role={'option'}
    >
      <input
        type="checkbox"
        checked={isChecked}
        className={checkbox({ className: 'pointer-events-none' })}
        onChange={() => false}
        ref={inputRef}
      />
      {children}
    </li>
  );
};
