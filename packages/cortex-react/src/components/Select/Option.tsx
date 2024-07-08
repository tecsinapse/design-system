import { option as styleOption } from '@tecsinapse/cortex-core';
import React, { useContext } from 'react';
import { SelectContext } from './context';

export interface SelectOptionProps<T> {
  option: T;
  onSelectOption: (option: T) => void;
}

export const SelectOption = <T,>({
  onSelectOption,
  option,
}: SelectOptionProps<T>) => {
  const { keyExtractor, labelExtractor, value } = useContext(SelectContext);

  return (
    <li
      onClick={() => onSelectOption(option)}
      className={styleOption({
        selected: value && keyExtractor(value) === keyExtractor(option),
      })}
      role={'option'}
    >
      {labelExtractor(option)}
    </li>
  );
};
