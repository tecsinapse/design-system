import { Granularity } from '@react-types/datepicker';
import React from 'react';
import { useDatePickerInput, useDatePickerInputCommon } from '../../hooks';
import { dateToCalendarDateTime } from '../../utils';
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
  /** Whether to display the time in 12 or 24 hour format. By default, this is determined by the user's locale. */
  hourCycle?: 12 | 24;
  /** Determines the smallest unit that is displayed in the date picker. By default, this is `"day"` for dates, and `"minute"` for times. */
  granularity?: Granularity;
}

const DatePickerInputWithPopover = (props: DatePickerInputProps) => {
  const {
    onChange,
    value,
    label,
    variants,
    disabled,
    hourCycle = 24,
    granularity = 'day',
  } = props;
  const { fieldProps, state, ref } = useDatePickerInput({
    value,
    onChange,
  });
  const { handleTogglePopover, handleChangeCalendar, handleCloseCalendar } =
    useDatePickerInputCommon({
      onChangeCalendar: (value?: Date) => {
        state.setValue(dateToCalendarDateTime(value));
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
            onChange={value => {
              fieldProps.onChange?.(value);
              handleCloseCalendar();
            }}
            isDisabled={disabled}
            onClickDate={handleTogglePopover}
            hourCycle={hourCycle}
            granularity={granularity}
            disabled={disabled}
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
