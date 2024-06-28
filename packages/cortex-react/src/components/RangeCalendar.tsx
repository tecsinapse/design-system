import {
  CalendarDate,
  createCalendar,
  getLocalTimeZone,
} from '@internationalized/date';
import React from 'react';
import { useLocale, useRangeCalendar } from 'react-aria';
import { useRangeCalendarState } from 'react-stately';
import { CalendarGrid } from './CalendarGrid';
import { CalendarHeader } from './CalendarHeader';

export type DateRange = {
  start: Date;
  end: Date;
};

interface RangeCalendarProps {
  onChange: (value: DateRange) => void;
  value: DateRange;
}

export const RangeCalendar = ({ value, onChange }: RangeCalendarProps) => {
  const { locale } = useLocale();
  const state = useRangeCalendarState({
    locale,
    createCalendar,
    defaultValue: {
      start: new CalendarDate(
        value.start.getFullYear(),
        value.start.getMonth(),
        value.start.getDate()
      ),
      end: new CalendarDate(
        value.end.getFullYear(),
        value.end.getMonth(),
        value.end.getDate()
      ),
    },
    onChange: value =>
      onChange({
        start: value.start.toDate(getLocalTimeZone()),
        end: value.end.toDate(getLocalTimeZone()),
      }),
  });

  const ref = React.useRef(null);
  const { calendarProps, title } = useRangeCalendar({}, state, ref);

  return (
    <div {...calendarProps} className="calendar" ref={ref}>
      <CalendarHeader
        onClickPrevButton={() => state.focusPreviousPage()}
        onClickNextButton={() => state.focusNextPage()}
        title={title}
      />
      <CalendarGrid state={state} />
    </div>
  );
};
