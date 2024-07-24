import { selectVariants } from '@tecsinapse/cortex-core';
import React, { useContext } from 'react';
import { Select } from '.';
import { SelectContext, SelectMultiOptionsContext } from './context';
import { handleSelectMulti } from './utils';

export interface SelectMultiGroupedOptionsProps<T> {
  onSelect: (value: T[]) => void;
  options?: Map<string, T[]>;
  groupedLabelExtractor: (value: string) => string;
  children?: React.ReactNode;
}

const { groupedTitle, list } = selectVariants();

export const SelectMultiGroupedOptions = <T,>({
  onSelect,
  groupedLabelExtractor,
  options,
  children,
}: SelectMultiGroupedOptionsProps<T>) => {
  const { value: currentValue = [], keyExtractor } = useContext(SelectContext);
  const flattenMap = options
    ? Array.from(options?.values()).flatMap(value => value)
    : [];

  return (
    <ul role={'select'} className={list()}>
      <SelectMultiOptionsContext.Provider
        value={{ onSelect, options: flattenMap }}
      >
        {children}
        {[...(options ?? [])].map(([key, value]) => (
          <div key={key}>
            <span className={groupedTitle()}>
              {groupedLabelExtractor?.(key)}
            </span>
            {value.map((option: T) => (
              <Select.MultiOption
                grouped
                option={option}
                key={keyExtractor(option)}
                onSelectOption={option =>
                  handleSelectMulti(
                    option,
                    currentValue,
                    onSelect,
                    keyExtractor
                  )
                }
              />
            ))}
          </div>
        ))}
      </SelectMultiOptionsContext.Provider>
    </ul>
  );
};
