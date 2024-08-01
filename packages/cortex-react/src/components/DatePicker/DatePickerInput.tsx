import { CalendarDate } from '@internationalized/date';
import React from 'react';
import { useDatePickerInput } from '../../hooks';
import { Calendar } from '../Calendar/Calendar';
import { InputPropsBase } from '../Input';
import { dateToCalendarDate } from '../utils';
import { DateField } from './DateField';
import { DatePickerInputBase } from './DatePickerInputBase';
import { Popover } from '../Popover';
import { usePopoverContext } from '../Popover/Context';
import { Content } from './Content';

export interface DatePickerInputProps extends InputPropsBase {
  value?: Date;
  onChange: (date: Date) => void;
}

/** DatePickerInput component */
const DatePickerInputWithPopover = (props: DatePickerInputProps) => {
  const { setIsOpen } = usePopoverContext();
  const { onChange, value, label, variants } = props;
  const { fieldProps, state, ref } = useDatePickerInput({ value, onChange });

  return (
    <div ref={ref} data-testid="date-picker-input">
      <Popover.Trigger>
        <DatePickerInputBase
          variants={{
            ...variants,
            intent: state.isInvalid ? 'error' : variants?.intent,
          }}
          label={label}
        >
          <div>
            <DateField
              {...fieldProps}
              onChange={value => {
                state.setDateValue(value as CalendarDate);
              }}
            />
          </div>
        </DatePickerInputBase>
      </Popover.Trigger>
      <Popover.Content className="bg-inherit shadow-none border-none">
        <Calendar
          value={value}
          onChange={value => {
            setIsOpen(false);
            state.setDateValue(dateToCalendarDate(value));
          }}
        />
      </Popover.Content>
    </div>
  );
};

export const DatePickerInput = (props: DatePickerInputProps) => (
  <Popover.Root placement="bottom-start" trigger="click">
    <Content>
      <DatePickerInputWithPopover {...props} />
    </Content>
  </Popover.Root>
);
