import { Granularity } from '@react-types/datepicker';
import React from 'react';
import { useDatePickerInputCommon, useDateRangePickerInput } from '../../hooks';
import { dateToCalendarDateTime } from '../../utils';
import { DateRange, RangeCalendar } from '../Calendar/RangeCalendar';
import { InputProps } from '../Input';
import { Popover } from '../Popover';
import { Content } from '../Content';
import { DateField } from './DateField';
import { DatePickerInputBase } from './DatePickerInputBase';

export interface DateRangePickerInputProps
  extends Omit<InputProps, 'value' | 'onChange'> {
  value?: DateRange;
  onChange: (date?: DateRange) => void;
  /** Whether to display the time in 12 or 24 hour format. By default, this is determined by the user's locale. */
  hourCycle?: 12 | 24;
  /** Determines the smallest unit that is displayed in the date picker. By default, this is `"day"` for dates, and `"minute"` for times. */
  granularity?: Granularity;
}

const DateRangePickerInputWithPopover = (props: DateRangePickerInputProps) => {
  const {
    onChange,
    value,
    label,
    variants,
    disabled = false,
    hourCycle = 24,
    granularity = 'day',
  } = props;
  const { endFieldProps, startFieldProps, ref, state } =
    useDateRangePickerInput({ value, onChange });
  const { handleTogglePopover, handleChangeCalendar, handleCloseCalendar } =
    useDatePickerInputCommon({
      onChangeRangeCalendar: value => {
        state.setDateRange({
          start: dateToCalendarDateTime(value?.start),
          end: dateToCalendarDateTime(value?.end),
        });
      },
    });

  return (
    <div ref={ref} data-testid="date-range-picker-input">
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
          <div className="flex flex-row gap-x-micro items-center">
            <DateField
              {...startFieldProps}
              onChange={value => {
                startFieldProps.onChange?.(value);
                handleCloseCalendar();
              }}
              isDisabled={disabled}
              onClickDate={handleTogglePopover}
              hourCycle={hourCycle}
              granularity={granularity}
            />
            <span>-</span>
            <DateField
              {...endFieldProps}
              onChange={value => {
                endFieldProps.onChange?.(value);
                handleCloseCalendar();
              }}
              isDisabled={disabled}
              onClickDate={handleTogglePopover}
              hourCycle={hourCycle}
              granularity={granularity}
            />
          </div>
        </DatePickerInputBase>
      </Popover.Trigger>
      <Popover.Content
        className="bg-inherit shadow-lg border-none"
        initialFocus={-1}
      >
        <RangeCalendar value={value} onChange={handleChangeCalendar} />
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
