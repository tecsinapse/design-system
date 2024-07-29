import { selectVariants } from '@tecsinapse/cortex-core';
import React, { useCallback, useContext } from 'react';
import { Select, SelectGroupedOptionsProps } from '.';
import { usePopoverContext } from '../Popover/Context';
import { SelectContext } from './context';

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
