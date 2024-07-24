import { selectVariants } from '@tecsinapse/cortex-core';
import React, { useCallback, useContext } from 'react';
import { Select } from '.';
import { usePopoverContext } from '../Popover/Context';
import { SelectContext } from './context';

export interface SelectGroupedOptionsProps<T> {
  onSelect: (value: T) => void;
  options?: Map<string, T[]>;
  groupedLabelExtractor: (value: string) => string;
}

const { groupedTitle, list } = selectVariants();

export const SelectGroupedOptions = <T,>({
  onSelect,
  groupedLabelExtractor,
  options,
}: SelectGroupedOptionsProps<T>) => {
  const { keyExtractor } = useContext(SelectContext);
  const { setIsOpen } = usePopoverContext();

  const handleSelect = useCallback(
    (option: T) => {
      onSelect(option);
      setIsOpen?.(false);
    },
    [onSelect]
  );

  return (
    <ul role={'select'} className={list()}>
      {[...(options ?? [])].map(([key, value]) => (
        <div key={key}>
          <span className={groupedTitle()}>{groupedLabelExtractor?.(key)}</span>
          {value.map((option: T) => (
            <Select.Option
              grouped
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
