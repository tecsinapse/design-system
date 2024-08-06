import React from 'react';
import { useRangeCalendar } from '../../hooks';
import { CalendarGrid } from './CalendarGrid';
import { CalendarHeader } from './CalendarHeader';

export type DateRange = {
  start: Date;
  end: Date;
};

export interface RangeCalendarProps {
  value?: DateRange;
  onChange: (value: DateRange) => void;
}

export const RangeCalendar = ({ value, onChange }: RangeCalendarProps) => {
  const { calendarProps, state, title, ref } = useRangeCalendar({
    value,
    onChange,
  });

  return (
    <div
      {...calendarProps}
      className="calendar"
      ref={ref}
      data-testid="calendar-range-div"
    >
      <CalendarHeader
        onClickPrevButton={() => state.focusPreviousPage()}
        onClickNextButton={() => state.focusNextPage()}
        title={title}
      />
      <CalendarGrid state={state} />
    </div>
  );
};
