import { selectVariants } from '@tecsinapse/cortex-core';
import React, { useContext, useMemo } from 'react';
import { IoChevronDownOutline } from 'react-icons/io5';
import { SelectContext } from './context';

export interface SelectTriggerProps {
  label: string;
  disabled?: boolean;
}

const { button } = selectVariants();

export const SelectTrigger = ({ label, disabled }: SelectTriggerProps) => {
  const { value, setOpen, labelExtractor, open } = useContext(SelectContext);
  const placeholder = useMemo(
    () => (value ? labelExtractor(value) : label),
    [label, value]
  );

  return (
    <button
      className={button({ disabled })}
      onClick={() => setOpen?.(!open)}
      disabled={disabled}
      role="button"
    >
      <span data-testid="select-placeholder">{placeholder}</span>
      <IoChevronDownOutline />
    </button>
  );
};
