import { BaseDatePickerInputProps } from './types';
import { useDatePickerInputCommon, useDateRangePickerInput } from '../../hooks';
import { dateToCalendarDateTime } from '../../utils';
import { Content } from '../Content';
import { DateField } from './DateField';
import { DatePickerInputBase } from './DatePickerInputBase';
import { Popover } from '../Popover';
import { InputProps } from '../Input';
import { DateRange, RangeCalendar } from '../Calendar/RangeCalendar';

export interface DateRangePickerInputProps
  extends Omit<InputProps, 'value' | 'onChange'>,
    BaseDatePickerInputProps {
  value?: DateRange;
  onChange: (date?: DateRange) => void;
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
    isTodayHighlited,
    minValue,
    maxValue,
  } = props;
  const { endFieldProps, startFieldProps, ref, state } =
    useDateRangePickerInput({ value, onChange, minValue, maxValue });
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
        className="bg-inherit shadow-default border-none"
        initialFocus={-1}
      >
        <RangeCalendar
          value={value}
          onChange={handleChangeCalendar}
          isTodayHighlited={isTodayHighlited}
          minValue={minValue}
          maxValue={maxValue}
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
