import { selectVariants } from '@tecsinapse/cortex-core';
import React, { useContext } from 'react';
import { Select, SelectMultiOptionsProps } from '.';
import { useSelectOptions } from '../../hooks';
import { SkeletonOptions } from './SkeletonOptions';
import { SelectContext, SelectMultiOptionsContext } from './context';
import { handleSelectMulti } from './utils';

const { list } = selectVariants();

export const SelectMultiOptions = <T,>({
  onSelect,
  options,
  children,
}: SelectMultiOptionsProps<T>) => {
  const { keyExtractor, value: currentValue = [] } = useContext(SelectContext);
  const { options: _options, isLoading } = useSelectOptions({ options });

  return (
    <SelectMultiOptionsContext.Provider value={{ onSelect, options: _options }}>
      {isLoading ? (
        <SkeletonOptions />
      ) : (
        <ul role={'select'} className={list()}>
          {children}
          {_options?.map(option => (
            <Select.MultiOption
              option={option}
              key={keyExtractor(option)}
              onSelectOption={option =>
                handleSelectMulti(option, currentValue, onSelect, keyExtractor)
              }
            />
          ))}
        </ul>
      )}
    </SelectMultiOptionsContext.Provider>
  );
};
