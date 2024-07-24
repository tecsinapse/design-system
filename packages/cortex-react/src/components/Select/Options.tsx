import { selectVariants } from '@tecsinapse/cortex-core';
import React, { useCallback, useContext } from 'react';
import { Select } from '.';
import { usePopoverContext } from '../Popover/Context';
import { SelectContext } from './context';

const { list } = selectVariants();

export interface SelectOptionsProps<T> {
  options?: T[];
  onSelect: (value: T) => void;
}

export const SelectOptions = <T,>({
  onSelect,
  options,
}: SelectOptionsProps<T>) => {
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
      {(options ?? []).map(option => (
        <Select.Option
          option={option}
          key={keyExtractor(option)}
          onSelectOption={handleSelect}
        />
      ))}
    </ul>
  );
};
