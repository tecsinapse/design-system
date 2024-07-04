import { selectVariants } from '@tecsinapse/cortex-core';
import React, { useCallback, useContext } from 'react';
import { Select } from '.';
import { SelectContext } from './context';

export interface SelectGroupedOptionsProps<T> {
  onSelect: (value: T) => void;
  options?: Map<string, T[]>;
  groupedLabelExtractor: (value: string) => string;
}

const { groupedTitle, containerGrouped } = selectVariants();

export const SelectGroupedOptions = <T,>({
  onSelect,
  groupedLabelExtractor,
  options,
}: SelectGroupedOptionsProps<T>) => {
  const { setOpen, keyExtractor } = useContext(SelectContext);

  const handleSelect = useCallback(
    (option: T) => {
      onSelect(option);
      setOpen?.(false);
    },
    [onSelect]
  );

  return (
    <ul role={'select'} className={containerGrouped()}>
      {[...(options ?? [])].map(([key, value]) => (
        <div key={key}>
          <span className={groupedTitle()}>{groupedLabelExtractor?.(key)}</span>
          {value.map((option: T) => (
            <Select.Option
              option={option}
              key={keyExtractor(option)}
              onSelectOption={handleSelect}
            />
          ))}
        </div>
      ))}
    </ul>
  );
};
