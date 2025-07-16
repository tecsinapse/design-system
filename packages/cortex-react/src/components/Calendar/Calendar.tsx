import React from 'react';
import { useCalendar } from '../../hooks';
import { CalendarGrid } from './CalendarGrid';
import { CalendarHeader } from './CalendarHeader';
import { CalendarProvider } from '../../provider';
import { BaseCalendarProps } from './types';

interface CalendarProps extends BaseCalendarProps {
  value?: Date;
  onChange: (value?: Date) => void;
}

/** Calendar component */
export const Calendar = ({
  value,
  onChange,
  isTodayHighlited = true,
  minValue,
  maxValue,
}: CalendarProps) => {
  const { calendarProps, title, state } = useCalendar({
    value,
    onChange,
    minValue,
    maxValue,
  });

  return (
    <CalendarProvider isTodayHighlited={isTodayHighlited}>
      <div {...calendarProps} className="calendar" data-testid="calendar-div">
        <CalendarHeader
          onClickPrevButton={() => state.focusPreviousPage()}
          onClickNextButton={() => state.focusNextPage()}
          title={title}
        />
        <CalendarGrid state={state} />
      </div>
    </CalendarProvider>
  );
};
