import { createCalendar } from '@internationalized/date';
import { useCalendar as useAriaCalendar, useLocale } from 'react-aria';
import { useCalendarState } from 'react-stately';
import { calendarDateToDate, dateToCalendarDateTime } from '../utils';

interface useCalendarProps {
  value?: Date;
  onChange: (value?: Date) => void;
  minValue?: Date;
  maxValue?: Date;
}

export const useCalendar = ({
  value,
  onChange,
  minValue,
  maxValue,
}: useCalendarProps) => {
  const { locale } = useLocale();
  const state = useCalendarState({
    locale,
    createCalendar,
    defaultValue: value ? dateToCalendarDateTime(value) : null,
    onChange: value => onChange(calendarDateToDate(value)),
    minValue: minValue ? dateToCalendarDateTime(minValue) : null,
    maxValue: maxValue ? dateToCalendarDateTime(maxValue) : null,
  });

  const { calendarProps, title } = useAriaCalendar({}, state);

  return {
    calendarProps,
    title,
    state,
  };
};
