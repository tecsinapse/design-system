import React, { useContext, useEffect, useRef, useMemo } from 'react';
import { IoChevronDownOutline } from 'react-icons/io5';
import { Popover } from '../Popover';
import { SelectContext } from './context';
import { SelectTriggerProps } from './types';
import clsx from 'clsx';
import { labelStyle, selectVariants } from '@tecsinapse/cortex-core';

const { button } = selectVariants();

export const SelectTrigger = ({
  label,
  placeholder,
  disabled,
  multiLabelSelected,
  ...rest
}: SelectTriggerProps) => {
  const { value, labelExtractor, setTriggerWidth } = useContext(SelectContext);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const _placeholder = useMemo(() => {
    if (value?.length === 0 || !value) return placeholder ?? label;
    if (value?.length === 1) return labelExtractor(value[0]);
    if (value?.length > 1)
      return multiLabelSelected
        ? multiLabelSelected(value.length)
        : `${value.length} items selected`;
    return labelExtractor(value);
  }, [label, value]);

  const hasValue = Array.isArray(value) ? value.length > 0 : !!value;

  useEffect(() => {
    if (triggerRef.current && setTriggerWidth) {
      const width = triggerRef.current.getBoundingClientRect().width;
      setTriggerWidth(width);
    }
  }, [triggerRef.current, setTriggerWidth]);

  return (
    <Popover.Trigger disabled={disabled}>
      <div className="w-full gap-mili">
        <button
          ref={triggerRef}
          className={button({ className: rest.className })}
          disabled={disabled}
          role="button"
          {...rest}
        >
          <span
            className={clsx('truncate', { 'mt-mili': hasValue && label })}
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
        ) : null}
      </div>
    </Popover.Trigger>
  );
};
