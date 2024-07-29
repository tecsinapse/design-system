import React from 'react';
import { useDateRangePickerInput } from '../../hooks';
import { DateRange, RangeCalendar } from '../Calendar/RangeCalendar';
import { InputPropsBase } from '../Input';
import { dateToCalendarDate } from '../utils';
import { DateField } from './DateField';
import { DatePickerInputBase } from './DatePickerInputBase';

export interface DateRangePickerInputProps extends InputPropsBase {
  value?: DateRange;
  onChange: (date: DateRange) => void;
}

export const DateRangePickerInput = (props: DateRangePickerInputProps) => {
  const { onChange, value, label, variants } = props;
  const { endFieldProps, startFieldProps, ref, state } =
    useDateRangePickerInput({ value, onChange });

  return (
    <div data-testid="date-range-picker-input">
      <DatePickerInputBase
        onClickCalendar={() => (state.isOpen ? state.close() : state.open())}
        variants={{
          ...variants,
          intent: state.isInvalid ? 'error' : variants?.intent,
        }}
        label={label}
      >
        <div ref={ref} className="flex flex-row gap-x-micro items-center">
          <DateField
            {...startFieldProps}
            value={dateToCalendarDate(value?.start)}
            onChange={value => {
              state.setDate('start', value);
              state.close();
            }}
          />
          <span>-</span>
          <DateField
            {...endFieldProps}
            value={dateToCalendarDate(value?.end)}
            onChange={value => {
              state.setDate('end', value);
              state.close();
            }}
          />
        </div>
      </DatePickerInputBase>
      {/* TODO: use popover when implemented */}
      {state.isOpen ? (
        <div className="absolute">
          <RangeCalendar
            value={value}
            onChange={value => {
              state.setDateRange({
                start: dateToCalendarDate(value.start),
                end: dateToCalendarDate(value.end),
              });
              state.close();
            }}
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
