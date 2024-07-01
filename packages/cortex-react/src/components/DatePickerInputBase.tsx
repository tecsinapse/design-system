import { inputBox, labelStyle } from '@tecsinapse/cortex-core';
import React from 'react';
import { LiaCalendar } from 'react-icons/lia';
import { Input, InputPropsBase } from './Input';

interface DatePickerInputBaseProps extends InputPropsBase {
  onClickCalendar: () => void;
  children: React.ReactElement;
}

export const DatePickerInputBase = ({
  children,
  variants,
  label,
  onClickCalendar,
}: DatePickerInputBaseProps) => {
  return (
    <Input.Face
      variants={{
        className: ['flex flex-row justify-between', variants?.className],
        intent: variants?.intent,
      }}
      data-testid={'date-picker-input-base'}
    >
      <span className={labelStyle({})}>{label}</span>
      <div
        className={inputBox(
          '',
          label,
          'flex flex-row gap-x-micro items-center'
        )}
      >
        {children}
      </div>
      <Input.Right>
        <LiaCalendar
          className="cursor-pointer"
          onClick={onClickCalendar}
          data-testid="date-picker-input-base-calendar"
        />
      </Input.Right>
    </Input.Face>
  );
};
