import { selectVariants } from '@tecsinapse/cortex-core';
import React, { useCallback, useContext } from 'react';
import { useSelectOptions } from '../../hooks';
import { usePopoverContext } from '../Popover/Context';
import { SelectOption } from './Option';
import { SkeletonOptions } from './SkeletonOptions';
import { SelectContext } from './context';
import { SelectOptionsProps } from './types';
const { list } = selectVariants();

export const SelectOptions = <T,>({
  onSelect,
  options,
}: SelectOptionsProps<T>) => {
  const { keyExtractor } = useContext(SelectContext);
  const { setIsOpen } = usePopoverContext();
  const { options: _options, isLoading } = useSelectOptions<T>({ options });

  const handleSelect = useCallback(
    (option: T) => {
      onSelect(option);
      setIsOpen?.(false);
    },
    [onSelect]
  );

  return isLoading ? (
    <SkeletonOptions />
  ) : (
    <ul role={'select'} className={list()}>
      {_options?.map(option => (
        <SelectOption
          option={option}
          key={keyExtractor(option)}
          onSelectOption={handleSelect}
        />
      ))}
    </ul>
  );
};
