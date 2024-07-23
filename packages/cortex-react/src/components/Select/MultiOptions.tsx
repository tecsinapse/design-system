import React, { useContext } from 'react';
import { Select } from '.';
import { SelectContext } from './context';
import { handleSelectMulti } from './utils';

export interface SelectMultiOptionsProps<T> {
  options?: T[];
  onSelect: (value: T[]) => void;
}

export const SelectMultiOptions = <T,>({
  onSelect,
  options,
}: SelectMultiOptionsProps<T>) => {
  const { keyExtractor, value: currentValue } = useContext(SelectContext);

  return (
    <ul role={'select'} className={'list-none'}>
      {(options ?? []).map(option => (
        <Select.MultiOption
          option={option}
          key={keyExtractor(option)}
          onSelectOption={option =>
            handleSelectMulti(option, currentValue, onSelect)
          }
        />
      ))}
    </ul>
  );
};
