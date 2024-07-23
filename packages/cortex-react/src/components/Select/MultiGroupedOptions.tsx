import { selectVariants } from '@tecsinapse/cortex-core';
import React, { useContext } from 'react';
import { Select } from '.';
import { SelectContext } from './context';
import { handleSelectMulti } from './utils';

export interface SelectMultiGroupedOptionsProps<T> {
  onSelect: (value: T[]) => void;
  options?: Map<string, T[]>;
  groupedLabelExtractor: (value: string) => string;
}

const { groupedTitle, containerGrouped } = selectVariants();

export const SelectMultiGroupedOptions = <T,>({
  onSelect,
  groupedLabelExtractor,
  options,
}: SelectMultiGroupedOptionsProps<T>) => {
  const { value: currentValue, keyExtractor } = useContext(SelectContext);

  return (
    <ul role={'select'} className={containerGrouped()}>
      {[...(options ?? [])].map(([key, value]) => (
        <div key={key}>
          <span className={groupedTitle()}>{groupedLabelExtractor?.(key)}</span>
          {value.map((option: T) => (
            <Select.MultiOption
              option={option}
              key={keyExtractor(option)}
              onSelectOption={option =>
                handleSelectMulti(option, currentValue, onSelect)
              }
            />
          ))}
        </div>
      ))}
    </ul>
  );
};
