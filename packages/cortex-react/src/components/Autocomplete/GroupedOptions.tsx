import { selectVariants } from '@tecsinapse/cortex-core';
import React from 'react';
import { AutocompleteGroupedOptionsProps, Option } from './types';
import { AutocompleteOption } from './Option';

const { groupedTitle, list } = selectVariants();

export const AutocompleteGroupedOptions = ({
  onSelect,
  groupedLabelExtractor,
  options,
}: AutocompleteGroupedOptionsProps) => {
  return (
    <ul role={'listbox'} className={list()}>
      {[...(options ?? [])].map(([key, value]) => (
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
