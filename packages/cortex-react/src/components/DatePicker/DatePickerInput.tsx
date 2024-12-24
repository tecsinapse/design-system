import { CalendarDate } from '@internationalized/date';
import React from 'react';
import { useDatePickerInput } from '../../hooks';
import { dateToCalendarDate } from '../../utils';
import { Calendar } from '../Calendar/Calendar';
import { InputProps } from '../Input';
import { Popover } from '../Popover';
import { usePopoverContext } from '../Popover/Context';
import { Content } from './Content';
import { DateField } from './DateField';
import { DatePickerInputBase } from './DatePickerInputBase';

export interface DatePickerInputProps
  extends Omit<InputProps, 'value' | 'onChange'> {
  value?: Date;
  onChange: (date: Date) => void;
}

const DatePickerInputWithPopover = (props: DatePickerInputProps) => {
  const { setIsOpen } = usePopoverContext();
  const { onChange, value, label, variants, disabled } = props;
  const { fieldProps, state, ref } = useDatePickerInput({ value, onChange });

  return (
    <div ref={ref} data-testid="date-picker-input">
      <Popover.Trigger disabled={disabled}>
        <DatePickerInputBase
          variants={{
            ...variants,
            intent: state.isInvalid ? 'error' : variants?.intent,
          }}
          label={label}
          disabled={disabled}
        >
          <div>
            <DateField
              {...fieldProps}
              onChange={value => {
                state.setDateValue(value as CalendarDate);
              }}
              isDisabled={disabled}
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
/** DatePickerInput component */
export const DatePickerInput = (props: DatePickerInputProps) => (
  <Popover.Root placement="bottom-start" trigger="click">
    <Content>
      <DatePickerInputWithPopover {...props} />
    </Content>
  </Popover.Root>
);
