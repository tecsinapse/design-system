import { useRef } from 'react';
import { useDateRangePicker } from 'react-aria';
import { useDateRangePickerState } from 'react-stately';
import { DateRange } from '../components';
import { calendarDateToDate, dateToCalendarDate } from '../utils';

interface useDateRangePickerInputProps {
  value?: DateRange;
  onChange: (date?: DateRange) => void;
}

export const useDateRangePickerInput = ({
  value,
  onChange,
}: useDateRangePickerInputProps) => {
  const state = useDateRangePickerState({
    defaultValue: value
      ? {
          start: dateToCalendarDate(value?.start),
          end: dateToCalendarDate(value?.end),
        }
      : null,
    onChange: value => {
      onChange({
        start: value ? calendarDateToDate(value.start) : undefined,
        end: value ? calendarDateToDate(value.end) : undefined,
      });
    },
  });

  const ref = useRef(null);

  const { startFieldProps, endFieldProps } = useDateRangePicker(
    { 'aria-label': 'date-range-picker-field' },
    state,
    ref
  );

  return { startFieldProps, endFieldProps, state, ref };
};
