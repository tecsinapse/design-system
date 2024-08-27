import { selectVariants } from '@tecsinapse/cortex-core';
import React, { useContext, useMemo } from 'react';
import { IoChevronDownOutline } from 'react-icons/io5';
import { Popover } from '../Popover';
import { SelectContext } from './context';
import { SelectTriggerProps } from './types';

const { button } = selectVariants();

export const SelectTrigger = ({
  label,
  placeholder,
  disabled,
  multiLabelSelected,
}: SelectTriggerProps) => {
  const { value, labelExtractor } = useContext(SelectContext);
  const _placeholder = useMemo(() => {
    if (value?.length === 0 || !value) return placeholder ?? label;
    if (value?.length === 1) return labelExtractor(value[0]);
    if (value?.length > 1)
      return multiLabelSelected
        ? multiLabelSelected(value.length)
        : `${value.length} items selected`;
    return labelExtractor(value);
  }, [label, value]);

  return (
    <Popover.Trigger>
      <button
        className={button({ disabled, className: 'bg-white' })}
        disabled={disabled}
        role="button"
      >
        <span data-testid="select-placeholder">{_placeholder}</span>
        <IoChevronDownOutline />
      </button>
    </Popover.Trigger>
  );
};
