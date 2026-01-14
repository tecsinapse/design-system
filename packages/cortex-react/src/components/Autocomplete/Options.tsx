import { selectVariants } from '@tecsinapse/cortex-core';
import React, { useMemo } from 'react';
import { AutocompleteOption } from './Option';
import { AutocompleteOptionsProps } from './types';
import { useAutocompleteOptions } from '../../hooks/useAutocompleteOptions';
import { SkeletonOptions } from '../Select/SkeletonOptions';

const { list } = selectVariants();

export const AutocompleteOptions = ({
  options,
  onSelect,
  children,
}: AutocompleteOptionsProps) => {
  const { options: _options, isLoading } = useAutocompleteOptions({ options });

  const defaultOptions = useMemo(
    () =>
      _options?.map(option => (
        <AutocompleteOption
          key={option.value}
          option={option}
          onSelect={onSelect}
        />
      )) ?? [],
    [_options, onSelect]
  );

  return isLoading ? (
    <SkeletonOptions />
  ) : (
    <ul role="listbox" className={list()}>
      {children ?? defaultOptions}
    </ul>
  );
};
