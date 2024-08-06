import { inputBox, labelStyle } from '@tecsinapse/cortex-core';
import React from 'react';
import { LiaCalendar } from 'react-icons/lia';
import { Input, InputPropsBase } from '../Input';

interface DatePickerInputBaseProps extends InputPropsBase {
  /** child element */
  children: React.ReactElement;
}

export const DatePickerInputBase = ({
  children,
  variants,
  label,
}: DatePickerInputBaseProps) => {
  return (
    <Input.Face variants={variants} data-testid={'date-picker-input-base'}>
      <span className={labelStyle({})}>{label}</span>
      <div className={inputBox('', label, 'w-full flex flex-row')}>
        {children}
      </div>
      <Input.Right className={''}>
        <LiaCalendar
          className="cursor-pointer mt-centi"
          data-testid="date-picker-input-base-calendar"
        />
      </Input.Right>
    </Input.Face>
  );
};
