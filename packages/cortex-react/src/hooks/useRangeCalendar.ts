import { createCalendar } from '@internationalized/date';
import { useRef } from 'react';
import {
  useRangeCalendar as useAriaRangeCalendar,
  useLocale,
} from 'react-aria';
import { useRangeCalendarState } from 'react-stately';
import { DateRange } from '../components';
import { calendarDateToDate, dateToCalendarDateTime } from '../utils';

interface useRangeCalendarProps {
  value?: DateRange;
  onChange: (value: DateRange) => void;
}

export const useRangeCalendar = ({
  value,
  onChange,
}: useRangeCalendarProps) => {
  const { locale } = useLocale();
  const state = useRangeCalendarState({
    locale,
    createCalendar,
    defaultValue: {
      start: dateToCalendarDateTime(value?.start),
      end: dateToCalendarDateTime(value?.end),
    },
    onChange: value =>
      onChange({
        start: calendarDateToDate(value.start),
        end: calendarDateToDate(value.end),
      }),
  });

  const ref = useRef(null);
  const { calendarProps, title } = useAriaRangeCalendar({}, state, ref);

  return {
    calendarProps,
    title,
    state,
    ref,
  };
};
