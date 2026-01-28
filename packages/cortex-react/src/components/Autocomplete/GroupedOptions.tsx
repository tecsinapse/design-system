import { selectVariants } from '@tecsinapse/cortex-core';
import React, { useContext } from 'react';
import { AutocompleteGroupedOptionsProps, Option } from './types';
import { AutocompleteOption } from './Option';
import { useAutocompleteGroupedOptions } from '../../hooks/useAutocompleteGroupedOptions';
import { SkeletonOptions } from '../Select/SkeletonOptions';
import { AutocompleteContext, AutocompleteContextType } from './context';

const { groupedTitle, list } = selectVariants();

export const AutocompleteGroupedOptions = <T,>({
  onSelect,
  groupedLabelExtractor,
  options,
}: AutocompleteGroupedOptionsProps<T>) => {
  const { options: _options, isLoading } = useAutocompleteGroupedOptions({
    options,
  });
  const context = useContext<AutocompleteContextType<T> | undefined>(
    AutocompleteContext
  );
  if (!context)
    throw new Error(
      'AutocompleteGroupedOptions must be used within AutocompleteRoot'
    );

  const { keyExtractor } = context;
  return isLoading ? (
    <SkeletonOptions />
  ) : (
    <ul role={'listbox'} className={list()}>
      {[...(_options ?? [])].map(([key, value]) => (
        <div key={key}>
          <span className={groupedTitle()}>{groupedLabelExtractor?.(key)}</span>
          {value.map((option: T) => (
            <AutocompleteOption
              grouped
              option={option}
              key={keyExtractor(option)}
              onSelect={onSelect}
            />
          ))}
        </div>
      ))}
    </ul>
  );
};
