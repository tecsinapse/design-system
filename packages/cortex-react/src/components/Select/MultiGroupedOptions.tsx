import { selectVariants } from '@tecsinapse/cortex-core';
import React, { useContext, useMemo } from 'react';
import { useSelectGroupedOptions } from '../../hooks';
import { SelectMultiOption } from './MultiOption';
import { SkeletonOptions } from './SkeletonOptions';
import { SelectContext, SelectMultiOptionsContext } from './context';
import { SelectMultiGroupedOptionsProps } from './types';
import { handleSelectMulti } from './utils';

const { groupedTitle, list } = selectVariants();

export const SelectMultiGroupedOptions = <T,>({
  onSelect,
  groupedLabelExtractor,
  options,
  children,
}: SelectMultiGroupedOptionsProps<T>) => {
  const { value: currentValue = [], keyExtractor } = useContext(SelectContext);
  const { options: _options, isLoading } = useSelectGroupedOptions({ options });
  const flattenMap = useMemo(
    () =>
      _options ? Array.from(_options?.values()).flatMap(value => value) : [],
    [options]
  );

  return (
    <SelectMultiOptionsContext.Provider
      value={{ onSelect, options: flattenMap }}
    >
      {children}
      {isLoading ? (
        <SkeletonOptions />
      ) : (
        <ul role={'select'} className={list()}>
          {[...(_options ?? [])].map(([key, value]) => (
            <div key={key}>
              <span className={groupedTitle()}>
                {groupedLabelExtractor?.(key)}
              </span>
              {value.map((option: T) => (
                <SelectMultiOption
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
        </ul>
      )}
    </SelectMultiOptionsContext.Provider>
  );
};
