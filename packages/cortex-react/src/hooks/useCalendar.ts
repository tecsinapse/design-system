import { createCalendar } from '@internationalized/date';
import { useCalendar as useAriaCalendar, useLocale } from 'react-aria';
import { useCalendarState } from 'react-stately';
import { calendarDateToDate, dateToCalendarDate } from '../components/utils';

interface useCalendarProps {
  value?: Date;
  onChange: (value: Date) => void;
}

export const useCalendar = ({ value, onChange }: useCalendarProps) => {
  const { locale } = useLocale();
  const state = useCalendarState({
    locale,
    createCalendar,
    defaultValue: dateToCalendarDate(value),
    onChange: value => onChange(calendarDateToDate(value)),
  });

  const { calendarProps, title } = useAriaCalendar({}, state);

  return {
    calendarProps,
    title,
    state,
  };
};
