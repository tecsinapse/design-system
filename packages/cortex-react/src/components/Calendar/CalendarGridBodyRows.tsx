import React from 'react';
import { CalendarState, RangeCalendarState } from 'react-stately';
import { CalendarCell } from './CalendarCell';

interface CalendarGridBodyRowsProps {
  state: CalendarState | RangeCalendarState;
}

export const CalendarGridBodyRows = ({ state }: CalendarGridBodyRowsProps) => {
  return (
    <>
      {[...new Array(6).keys()].map(weekIndex => (
        <tr key={weekIndex} className="shadow-0 px-deca">
          {state.getDatesInWeek(weekIndex).map((date, i) => {
            return date ? (
              <CalendarCell key={i} state={state} date={date} />
            ) : (
              <td key={i} />
            );
          })}
        </tr>
      ))}
    </>
  );
};
