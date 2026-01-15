import { selectVariants } from '@tecsinapse/cortex-core';
import React, { useContext, useMemo } from 'react';
import { AutocompleteOption } from './Option';
import { AutocompleteOptionsProps } from './types';
import { useAutocompleteOptions } from '../../hooks/useAutocompleteOptions';
import { SkeletonOptions } from '../Select/SkeletonOptions';
import { AutocompleteContext, AutocompleteContextType } from './context';

const { list } = selectVariants();

export const AutocompleteOptions = <T,>({
  options,
  onSelect,
  children,
}: AutocompleteOptionsProps<T>) => {
  const context = useContext<AutocompleteContextType<T> | undefined>(
    AutocompleteContext
  );
  if (!context)
    throw new Error('AutocompleteOptions must be used within AutocompleteRoot');

  const { keyExtractor } = context;

  const { options: _options, isLoading } = useAutocompleteOptions<T>({
    options,
  });

  const defaultOptions = useMemo(
    () =>
      _options?.map(option => (
        <AutocompleteOption
          key={keyExtractor(option)}
          option={option}
          onSelect={onSelect}
        />
      )) ?? [],
    [_options, onSelect, keyExtractor]
  );

  return isLoading ? (
    <SkeletonOptions />
  ) : (
    <ul role="listbox" className={list()}>
      {children ?? defaultOptions}
    </ul>
  );
};
