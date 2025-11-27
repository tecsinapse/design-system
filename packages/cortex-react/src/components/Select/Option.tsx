import { option as styleOption } from '@tecsinapse/cortex-core';
import React, { useContext } from 'react';
import { SelectContext } from './context';
import { SelectOptionProps } from './types';

export const SelectOption = <T,>({
  onSelectOption,
  option,
  grouped = false,
}: SelectOptionProps<T>) => {
  const { keyExtractor, labelExtractor, value } = useContext(SelectContext);

  return (
    <li
      onClick={() => onSelectOption(option)}
      className={styleOption({
        selected: value && keyExtractor(value) === keyExtractor(option),
        grouped,
      })}
      role={'option'}
    >
      <span className="truncate flex-1">{labelExtractor(option)}</span>
    </li>
  );
};
