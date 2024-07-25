import React from 'react';
import { useCalendar } from '../../hooks';
import { CalendarGrid } from './CalendarGrid';
import { CalendarHeader } from './CalendarHeader';

interface CalendarProps {
  value?: Date;
  onChange: (value: Date) => void;
}

export const Calendar = ({ value, onChange }: CalendarProps) => {
  const { calendarProps, title, state } = useCalendar({ value, onChange });

  return (
    <div {...calendarProps} className="calendar" data-testid="calendar-div">
      <CalendarHeader
        onClickPrevButton={() => state.focusPreviousPage()}
        onClickNextButton={() => state.focusNextPage()}
        title={title}
      />
      <CalendarGrid state={state} />
    </div>
  );
};
