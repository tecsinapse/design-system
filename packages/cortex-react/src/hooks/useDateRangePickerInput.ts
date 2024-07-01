import { useRef } from 'react';
import { useDateRangePicker } from 'react-aria';
import { useDateRangePickerState } from 'react-stately';
import { DateRange } from '../components';
import { calendarDateToDate, dateToCalendarDate } from '../components/utils';

interface useDateRangePickerInputProps {
  value?: DateRange;
  onChange: (date: DateRange) => void;
}

export const useDateRangePickerInput = ({
  value,
  onChange,
}: useDateRangePickerInputProps) => {
  const state = useDateRangePickerState({
    defaultValue: {
      start: dateToCalendarDate(value?.start),
      end: dateToCalendarDate(value?.end),
    },
    onChange: value => {
      onChange({
        start: calendarDateToDate(value.start),
        end: calendarDateToDate(value.end),
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
