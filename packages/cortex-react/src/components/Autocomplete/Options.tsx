import { selectVariants } from '@tecsinapse/cortex-core';
import React, { useMemo } from 'react';
import { AutocompleteOption } from './Option';
import { AutocompleteOptionsProps } from './types';

const { list } = selectVariants();

export const AutocompleteOptions = ({
  options,
  onSelect,
  children,
}: AutocompleteOptionsProps) => {
  const defaultOptions = useMemo(
    () =>
      options?.map(option => (
        <AutocompleteOption
          key={option.value}
          option={option}
          onSelect={onSelect}
        />
      )) ?? [],
    [options, onSelect]
  );

  return (
    <ul role="listbox" className={list()}>
      {children ?? defaultOptions}
    </ul>
  );
};
