import { labelStyle, selectVariants } from '@tecsinapse/cortex-core';
import React, { useContext, useMemo } from 'react';
import { IoChevronDownOutline } from 'react-icons/io5';
import { Popover } from '../Popover';
import { SelectContext } from './context';
import { SelectTriggerProps } from './types';
import clsx from 'clsx';

const { button } = selectVariants();

export const SelectTrigger = ({
  label,
  placeholder,
  disabled,
  multiLabelSelected,
  ...rest
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

  const { className } = rest;

  const hasValue = Array.isArray(value) ? value.length > 0 : !!value;
  return (
    <Popover.Trigger disabled={disabled}>
      <div className="w-full gap-mili">
        <button
          className={button({ className })}
          disabled={disabled}
          role="button"
          {...rest}
        >
          <span
            className={clsx({ 'mt-mili': hasValue && label })}
            data-testid="select-placeholder"
          >
            {_placeholder}
          </span>
          <IoChevronDownOutline />
        </button>
        {hasValue && label ? (
          <label
            htmlFor="select-trigger"
            className={clsx(
              'ml-centi',
              labelStyle({ intent: 'default', placeholder })
            )}
            data-testid="input-label"
          >
            {label}
          </label>
        ) : (
          <></>
        )}
      </div>
    </Popover.Trigger>
  );
};
