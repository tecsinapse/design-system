import {
  CalendarDate,
  createCalendar,
  getLocalTimeZone,
} from '@internationalized/date';
import { useCalendar as useAriaCalendar, useLocale } from 'react-aria';
import { useCalendarState } from 'react-stately';

interface useCalendarProps {
  value: Date;
  onChange: (value: Date) => void;
}

export const useCalendar = ({ value, onChange }: useCalendarProps) => {
  const { locale } = useLocale();
  const state = useCalendarState({
    locale,
    createCalendar,
    defaultValue: new CalendarDate(
      value.getFullYear(),
      value.getMonth(),
      value.getDate()
    ),
    onChange: value => onChange(value.toDate(getLocalTimeZone())),
  });

  const { calendarProps, title } = useAriaCalendar({}, state);

  return {
    calendarProps,
    title,
    state,
  };
};
