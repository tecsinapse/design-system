import { selectVariants } from '@tecsinapse/cortex-core';
import React, { useCallback, useContext } from 'react';
import { useSelectGroupedOptions } from '../../hooks';
import { usePopoverContext } from '../Popover/Context';
import { SelectOption } from './Option';
import { SkeletonOptions } from './SkeletonOptions';
import { SelectContext } from './context';
import { SelectGroupedOptionsProps } from './types';

const { groupedTitle, list } = selectVariants();

export const SelectGroupedOptions = <T,>({
  onSelect,
  groupedLabelExtractor,
  options,
}: SelectGroupedOptionsProps<T>) => {
  const { keyExtractor } = useContext(SelectContext);
  const { setIsOpen } = usePopoverContext();
  const { options: _options, isLoading } = useSelectGroupedOptions({ options });

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
      {[...(_options ?? [])].map(([key, value]) => (
        <div key={key}>
          <span className={groupedTitle()}>{groupedLabelExtractor?.(key)}</span>
          {value.map((option: T) => (
            <SelectOption
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
