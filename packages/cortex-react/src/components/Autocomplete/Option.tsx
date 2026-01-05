import { option as styleOption } from '@tecsinapse/cortex-core';
import React, { useCallback, useContext } from 'react';
import { AutocompleteOptionProps, Option } from './types';
import { AutocompleteContext } from './context';

export const AutocompleteOption = ({
  option,
  onSelect,
}: AutocompleteOptionProps) => {
  const context = useContext(AutocompleteContext);
  if (!context)
    throw new Error('AutocompleteOptions must be used within AutocompleteRoot');

  const { setOpen } = context;

  const handleSelect = useCallback(
    (option: Option) => {
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
      })}
      role="option"
    >
      <span className="truncate flex-1">{option.label}</span>
    </li>
  );
};
