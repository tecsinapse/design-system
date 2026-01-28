import { option as styleOption } from '@tecsinapse/cortex-core';
import React, { useCallback, useContext } from 'react';
import { AutocompleteOptionProps } from './types';
import { AutocompleteContext, AutocompleteContextType } from './context';

export const AutocompleteOption = <T,>({
  option,
  onSelect,
  grouped = false,
}: AutocompleteOptionProps<T>) => {
  const context = useContext<AutocompleteContextType<T> | undefined>(
    AutocompleteContext
  );
  if (!context)
    throw new Error('AutocompleteOptions must be used within AutocompleteRoot');

  const { setOpen, labelExtractor } = context;

  const handleSelect = useCallback(
    (option: T) => {
      setOpen(false);
      onSelect?.(option);
    },
    [onSelect, setOpen]
  );

  return (
    <li
      onClick={() => handleSelect(option)}
      className={styleOption({
        selected: false,
        grouped,
      })}
      role="option"
    >
      <span className="truncate flex-1">{labelExtractor(option)}</span>
    </li>
  );
};
