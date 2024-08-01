import React from 'react';
import { useDateRangePickerInput, useOutsideClickListener } from '../../hooks';
import { DateRange, RangeCalendar } from '../Calendar/RangeCalendar';
import { InputPropsBase } from '../Input';
import { dateToCalendarDate } from '../utils';
import { DateField } from './DateField';
import { DatePickerInputBase } from './DatePickerInputBase';
import { Popover } from '../Popover';
import { usePopoverContext } from '../Popover/Context';
import { Content } from './Content';

export interface DateRangePickerInputProps extends InputPropsBase {
  value?: DateRange;
  onChange: (date: DateRange) => void;
}

const DateRangePickerInputWithPopover = (props: DateRangePickerInputProps) => {
  const { setIsOpen } = usePopoverContext();
  const { onChange, value, label, variants } = props;
  const { endFieldProps, startFieldProps, ref, state } =
    useDateRangePickerInput({ value, onChange });

  return (
    <div ref={ref} data-testid="date-range-picker-input">
      <Popover.Trigger>
        <DatePickerInputBase
          variants={{
            ...variants,
            intent: state.isInvalid ? 'error' : variants?.intent,
          }}
          label={label}
        >
          <div className="flex flex-row gap-x-micro items-center">
            <DateField
              {...startFieldProps}
              value={dateToCalendarDate(value?.start)}
              onChange={value => {
                state.setDate('start', value);
              }}
            />
            <span>-</span>
            <DateField
              {...endFieldProps}
              value={dateToCalendarDate(value?.end)}
              onChange={value => {
                state.setDate('end', value);
              }}
            />
          </div>
        </DatePickerInputBase>
      </Popover.Trigger>
      <Popover.Content className="bg-inherit shadow-none border-none">
        <RangeCalendar
          value={value}
          onChange={value => {
            setIsOpen?.(false);
            state.setDateRange({
              start: dateToCalendarDate(value.start),
              end: dateToCalendarDate(value.end),
            });
          }}
        />
      </Popover.Content>
    </div>
  );
};

export const DateRangePickerInput = (props: DateRangePickerInputProps) => (
  <Popover.Root placement="bottom-start" trigger="click">
    <Content>
      <DateRangePickerInputWithPopover {...props} />
    </Content>
  </Popover.Root>
);
