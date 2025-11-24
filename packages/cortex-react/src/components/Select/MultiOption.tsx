import { checkbox, option as styleOption } from '@tecsinapse/cortex-core';
import React from 'react';
import { SelectMultiOptionProps } from './types';
import { useMultiSelectOption } from './useMultiSelectOption';

export const SelectMultiOption = <T,>({
  onSelect,
  option,
  grouped = false,
}: SelectMultiOptionProps<T>) => {
  const { onClickOption, isChecked, inputRef, labelExtractor } =
    useMultiSelectOption(option, onSelect);

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
      <span className="truncate flex-1">{labelExtractor(option)}</span>
    </li>
  );
};
