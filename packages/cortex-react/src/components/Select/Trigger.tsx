import { selectVariants } from '@tecsinapse/cortex-core';
import React, { useContext, useMemo } from 'react';
import { IoChevronDownOutline } from 'react-icons/io5';
import { SelectContext } from './context';
import { Popover } from '../Popover/Popover';

export interface SelectTriggerProps {
  label: string;
  disabled?: boolean;
}

const { button } = selectVariants();

export const SelectTrigger = ({ label, disabled }: SelectTriggerProps) => {
  const { value, setIsOpen, labelExtractor, isOpen } =
    useContext(SelectContext);
  const placeholder = useMemo(
    () => (value ? labelExtractor(value) : label),
    [label, value]
  );

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
