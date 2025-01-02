import React from 'react';
import { useDatePickerInput, useDatePickerInputCommon } from '../../hooks';
import { dateToCalendarDate } from '../../utils';
import { Calendar } from '../Calendar/Calendar';
import { InputProps } from '../Input';
import { Popover } from '../Popover';
import { Content } from '../Select/Content';
import { DateField } from './DateField';
import { DatePickerInputBase } from './DatePickerInputBase';

export interface DatePickerInputProps
  extends Omit<InputProps, 'value' | 'onChange'> {
  value?: Date;
  onChange: (date?: Date) => void;
}

const DatePickerInputWithPopover = (props: DatePickerInputProps) => {
  const { onChange, value, label, variants, disabled } = props;
  const { fieldProps, state, ref } = useDatePickerInput({ value, onChange });
  const { handleTogglePopover, handleChangeCalendar } =
    useDatePickerInputCommon({
      onChangeCalendar: (value?: Date) => {
        state.setDateValue(dateToCalendarDate(value));
      },
    });

  return (
    <div ref={ref} data-testid="date-picker-input">
      <Popover.Trigger disabled={true}>
        <DatePickerInputBase
          variants={{
            ...variants,
            intent: state.isInvalid ? 'error' : variants?.intent,
          }}
          label={label}
          disabled={disabled}
          value={value}
          onClean={() => state.setValue(null)}
          onToggle={handleTogglePopover}
        >
          <DateField
            {...fieldProps}
            isDisabled={disabled}
            onClick={handleTogglePopover}
          />
        </DatePickerInputBase>
      </Popover.Trigger>
      <Popover.Content
        className="bg-inherit shadow-none border-none"
        initialFocus={-1}
      >
        <Calendar value={value} onChange={handleChangeCalendar} />
      </Popover.Content>
    </div>
  );
};

/** DatePickerInput component, extends HTML Input Element props*/
export const DatePickerInput = (props: DatePickerInputProps) => (
  <Popover.Root placement="bottom-start" trigger="click">
    <Content>
      <DatePickerInputWithPopover {...props} />
    </Content>
  </Popover.Root>
);
