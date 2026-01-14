import { selectVariants } from '@tecsinapse/cortex-core';
import React from 'react';
import { AutocompleteGroupedOptionsProps, Option } from './types';
import { AutocompleteOption } from './Option';
import { useAutocompleteGroupedOptions } from '../../hooks/useAutocompleteGroupedOptions';
import { SkeletonOptions } from '../Select/SkeletonOptions';

const { groupedTitle, list } = selectVariants();

export const AutocompleteGroupedOptions = ({
  onSelect,
  groupedLabelExtractor,
  options,
}: AutocompleteGroupedOptionsProps) => {
  const { options: _options, isLoading } = useAutocompleteGroupedOptions({
    options,
  });
  return isLoading ? (
    <SkeletonOptions />
  ) : (
    <ul role={'listbox'} className={list()}>
      {[...(_options ?? [])].map(([key, value]) => (
        <div key={key}>
          <span className={groupedTitle()}>{groupedLabelExtractor?.(key)}</span>
          {value.map((option: Option) => (
            <AutocompleteOption
              grouped
              option={option}
              key={option.value}
              onSelect={onSelect}
            />
          ))}
        </div>
      ))}
    </ul>
  );
};
