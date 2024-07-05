import React, { useCallback, useContext } from 'react';
import { Select } from '.';
import { SelectContext } from './context';

export interface SelectOptionsProps<T> {
  options?: T[];
  onSelect: (value: T) => void;
}

export const SelectOptions = <T,>({
  onSelect,
  options,
}: SelectOptionsProps<T>) => {
  const { setOpen, keyExtractor } = useContext(SelectContext);

  const handleSelect = useCallback(
    (option: T) => {
      onSelect(option);
      setOpen?.(false);
    },
    [onSelect]
  );

  return (
    <ul role={'select'}>
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
