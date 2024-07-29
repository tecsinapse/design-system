import { CalendarDate } from '@internationalized/date';
import React from 'react';
import { useDatePickerInput } from '../../hooks';
import { Calendar } from '../Calendar/Calendar';
import { InputPropsBase } from '../Input';
import { dateToCalendarDate } from '../utils';
import { DateField } from './DateField';
import { DatePickerInputBase } from './DatePickerInputBase';

export interface DatePickerInputProps extends InputPropsBase {
  value?: Date;
  onChange: (date: Date) => void;
}

/** DatePickerInput component */
export const DatePickerInput = (props: DatePickerInputProps) => {
  const { onChange, value, label, variants } = props;
  const { fieldProps, state, ref } = useDatePickerInput({ value, onChange });

  return (
    <div data-testid={'date-picker-input'}>
      <DatePickerInputBase
        onClickCalendar={() => (state.isOpen ? state.close() : state.open())}
        variants={{
          ...variants,
          intent: state.isInvalid ? 'error' : variants?.intent,
        }}
        label={label}
      >
        <div ref={ref}>
          <DateField
            {...fieldProps}
            onChange={value => {
              state.setDateValue(value as CalendarDate);
              state.close();
            }}
          />
        </div>
      </DatePickerInputBase>
      {/* TODO: use popover when implemented */}
      {state.isOpen ? (
        <div className="absolute">
          <Calendar
            value={value}
            onChange={value => {
              state.setDateValue(dateToCalendarDate(value));
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
