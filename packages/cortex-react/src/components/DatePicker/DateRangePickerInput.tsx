import React from 'react';
import { useDateRangePickerInput } from '../../hooks';
import { dateToCalendarDate } from '../../utils';
import { DateRange, RangeCalendar } from '../Calendar/RangeCalendar';
import { InputProps } from '../Input';
import { Popover } from '../Popover';
import { usePopoverContext } from '../Popover/Context';
import { Content } from './Content';
import { DateField } from './DateField';
import { DatePickerInputBase } from './DatePickerInputBase';

export interface DateRangePickerInputProps
  extends Omit<InputProps, 'value' | 'onChange'> {
  value?: DateRange;
  onChange: (date?: DateRange) => void;
}

const DateRangePickerInputWithPopover = (props: DateRangePickerInputProps) => {
  const { setIsOpen } = usePopoverContext();
  const { onChange, value, label, variants, disabled = false } = props;
  const { endFieldProps, startFieldProps, ref, state } =
    useDateRangePickerInput({ value, onChange });

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
          onToggle={() => setIsOpen(open => !open)}
        >
          <div className="flex flex-row gap-x-micro items-center">
            <DateField {...startFieldProps} isDisabled={disabled} />
            <span>-</span>
            <DateField {...endFieldProps} isDisabled={disabled} />
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
