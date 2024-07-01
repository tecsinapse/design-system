import { CalendarDate } from '@internationalized/date';
import { useRef } from 'react';
import { useDatePicker } from 'react-aria';
import { useDatePickerState } from 'react-stately';
import { calendarDateToDate, dateToCalendarDate } from '../components/utils';

interface useDatePickerInputProps {
  value?: Date;
  onChange: (date: Date) => void;
}

export const useDatePickerInput = ({
  value,
  onChange,
}: useDatePickerInputProps) => {
  const state = useDatePickerState({
    defaultValue: dateToCalendarDate(value),
    onChange: (value: CalendarDate) => {
      onChange(calendarDateToDate(value));
    },
  });
  const ref = useRef(null);
  const { fieldProps } = useDatePicker(
    { 'aria-label': 'date-picker-field' },
    state,
    ref
  );

  return {
    fieldProps,
    state,
    ref,
  };
};
