import React, { useCallback, useContext } from 'react';
import { SelectContext } from './context';
import { Select } from '.';

export interface SelectOptionsProps<T> {
  options?: T[];
  onSelect: (value: T) => void;
}

export const SelectOptions = <T,>({
  onSelect,
  options,
}: SelectOptionsProps<T>) => {
  const { setIsOpen, keyExtractor } = useContext(SelectContext);

  const handleSelect = useCallback(
    (option: T) => {
      onSelect(option);
      setIsOpen?.(false);
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
