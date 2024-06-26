import {
  CalendarDate,
  createCalendar,
  getLocalTimeZone,
} from '@internationalized/date';
import React from 'react';
import { useCalendar, useLocale } from 'react-aria';
import { useCalendarState } from 'react-stately';
import { CalendarGrid } from './CalendarGrid';
import { CalendarHeader } from './CalendarHeader';

interface CalendarProps {
  onChange: (value: Date) => void;
  value: Date;
}

export const Calendar = ({ value, onChange }: CalendarProps) => {
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

  const { calendarProps, title } = useCalendar({}, state);

  return (
    <div {...calendarProps} className="calendar">
      <CalendarHeader
        onClickPrevButton={() => state.focusPreviousPage()}
        onClickNextButton={() => state.focusNextPage()}
        title={title}
      />
      <CalendarGrid state={state} />
    </div>
  );
};
