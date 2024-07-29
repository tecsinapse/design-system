import { selectVariants } from '@tecsinapse/cortex-core';
import React, { useContext, useMemo } from 'react';
import { Select, SelectMultiGroupedOptionsProps } from '.';
import { SelectContext, SelectMultiOptionsContext } from './context';
import { handleSelectMulti } from './utils';

const { groupedTitle, list } = selectVariants();

export const SelectMultiGroupedOptions = <T,>({
  onSelect,
  groupedLabelExtractor,
  options,
  children,
}: SelectMultiGroupedOptionsProps<T>) => {
  const { value: currentValue = [], keyExtractor } = useContext(SelectContext);
  const flattenMap = useMemo(
    () =>
      options ? Array.from(options?.values()).flatMap(value => value) : [],
    [options]
  );

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
