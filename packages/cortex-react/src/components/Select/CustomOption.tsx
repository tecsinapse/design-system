import React, { useContext } from 'react';
import { SelectContext } from './context';
import { option as styleOption } from '@tecsinapse/cortex-core';
import { CustomOptionProps } from './types';

export const SelectCustomOption = <T,>({
  option,
  onSelectOption,
  grouped = false,
  children,
}: CustomOptionProps<T>) => {
  const { keyExtractor, value } = useContext(SelectContext);

  return (
    <li
      onClick={e => {
        e.preventDefault();
        onSelectOption(option);
      }}
      className={styleOption({
        selected: value && keyExtractor(value) === keyExtractor(option),
        grouped,
      })}
      role={'option'}
    >
      {children}
    </li>
  );
};
