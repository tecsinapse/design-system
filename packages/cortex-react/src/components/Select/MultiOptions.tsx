import { selectVariants } from '@tecsinapse/cortex-core';
import React, { useContext } from 'react';
import { Select } from '.';
import { SelectContext, SelectMultiOptionsContext } from './context';
import { handleSelectMulti } from './utils';

const { list } = selectVariants();
export interface SelectMultiOptionsProps<T> {
  options?: T[];
  onSelect: (value: T[]) => void;
  children?: React.ReactNode;
}

export const SelectMultiOptions = <T,>({
  onSelect,
  options,
  children,
}: SelectMultiOptionsProps<T>) => {
  const { keyExtractor, value: currentValue = [] } = useContext(SelectContext);

  return (
    <SelectMultiOptionsContext.Provider value={{ onSelect, options }}>
      <ul role={'select'} className={list()}>
        {children}
        {(options ?? []).map(option => (
          <Select.MultiOption
            option={option}
            key={keyExtractor(option)}
            onSelectOption={option =>
              handleSelectMulti(option, currentValue, onSelect, keyExtractor)
            }
          />
        ))}
      </ul>
    </SelectMultiOptionsContext.Provider>
  );
};
