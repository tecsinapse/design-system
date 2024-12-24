import { inputBox, labelStyle } from '@tecsinapse/cortex-core';
import clsx from 'clsx';
import React from 'react';
import { LiaCalendar } from 'react-icons/lia';
import { Input, InputProps } from '../Input';

interface DatePickerInputBaseProps extends InputProps {
  /** child element */
  children: React.ReactElement;
  disabled?: boolean;
}

export const DatePickerInputBase = ({
  children,
  variants,
  label,
  disabled,
}: DatePickerInputBaseProps) => {
  return (
    <Input.Face variants={variants} data-testid={'date-picker-input-base'}>
      <span className={labelStyle({})}>{label}</span>
      <div className={inputBox('', label, 'w-full flex flex-row')}>
        {children}
      </div>
      <Input.Right className={''}>
        <LiaCalendar
          className={clsx(
            'mt-centi',
            !disabled ? 'cursor-pointer' : 'text-secondary-light'
          )}
          data-testid="date-picker-input-base-calendar"
        />
      </Input.Right>
    </Input.Face>
  );
};
