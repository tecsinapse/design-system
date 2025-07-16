import React from 'react';
import { useRangeCalendar } from '../../hooks';
import { CalendarGrid } from './CalendarGrid';
import { CalendarHeader } from './CalendarHeader';
import { CalendarProvider } from '../../provider';
import { BaseCalendarProps } from './types';

export type DateRange = {
  start?: Date;
  end?: Date;
};

export interface RangeCalendarProps extends BaseCalendarProps {
  value?: DateRange;
  onChange: (value: DateRange) => void;
}

export const RangeCalendar = ({
  value,
  onChange,
  isTodayHighlited = true,
  minValue,
  maxValue,
}: RangeCalendarProps) => {
  const { calendarProps, state, title, ref } = useRangeCalendar({
    value,
    onChange,
    minValue,
    maxValue,
  });

  return (
    <CalendarProvider isTodayHighlited={isTodayHighlited}>
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
    </CalendarProvider>
  );
};
