import { selectVariants } from '@tecsinapse/cortex-core';
import React, { useContext, useMemo } from 'react';
import { IoChevronDownOutline } from 'react-icons/io5';
import { Popover } from '../Popover';
import { SelectContext } from './context';

export interface SelectTriggerProps {
  label: string;
  disabled?: boolean;
}

const { button } = selectVariants();

export const SelectTrigger = ({ label, disabled }: SelectTriggerProps) => {
  const { value, labelExtractor } = useContext(SelectContext);
  const placeholder = useMemo(() => {
    if (value?.length === 0 || !value) return label;
    if (value?.length === 1) return labelExtractor(value[0]);
    if (value?.length > 1) return `${value.length} items selected`;
    return labelExtractor(value);
  }, [label, value]);

  return (
    <Popover.Trigger>
      <button
        className={button({ disabled })}
        disabled={disabled}
        role="button"
      >
        <span data-testid="select-placeholder">{placeholder}</span>
        <IoChevronDownOutline />
      </button>
    </Popover.Trigger>
  );
};
