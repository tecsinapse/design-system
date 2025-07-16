import { CalendarDateTime } from '@internationalized/date';
import { useEffect, useRef } from 'react';
import { useDatePicker } from 'react-aria';
import { useDatePickerState } from 'react-stately';
import { calendarDateToDate, dateToCalendarDateTime } from '../utils';

interface useDatePickerInputProps {
  value?: Date;
  onChange: (date?: Date) => void;
  minValue?: Date;
  maxValue?: Date;
}

export const useDatePickerInput = ({
  value,
  onChange,
  minValue,
  maxValue,
}: useDatePickerInputProps) => {
  const state = useDatePickerState({
    defaultValue: value ? dateToCalendarDateTime(value) : null,
    onChange: (_value: CalendarDateTime | null) => {
      onChange(calendarDateToDate(_value));
    },
    minValue: minValue ? dateToCalendarDateTime(minValue) : null,
    maxValue: maxValue ? dateToCalendarDateTime(maxValue) : null,
  });
  const ref = useRef(null);
  const { fieldProps } = useDatePicker(
    { 'aria-label': 'date-picker-field' },
    state,
    ref
  );

  useEffect(() => {
    if (!value) {
      state.setValue(null);
    } else if (
      value &&
      state.value?.compare(dateToCalendarDateTime(value)) !== 0
    ) {
      state.setValue(dateToCalendarDateTime(value));
    }
  }, [value]);

  return {
    fieldProps,
    state,
    ref,
  };
};
