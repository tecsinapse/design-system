import React from 'react';
import { useCalendarGrid } from 'react-aria';
import { CalendarState, RangeCalendarState } from 'react-stately';
import { CalendarCell } from './CalendarCell';
import { THeadCell } from './Table';

interface CalendarGridProps {
  state: CalendarState | RangeCalendarState;
}

export const CalendarGrid = ({ state }: CalendarGridProps) => {
  const { gridProps, headerProps, weekDays } = useCalendarGrid({}, state);

  return (
    <div className="bg-white rounded-micro px-deca py-mili">
      <table {...gridProps}>
        <thead {...headerProps}>
          <tr>
            {weekDays.map((day, index) => (
              <THeadCell key={index}>{day}</THeadCell>
            ))}
          </tr>
        </thead>
        <tbody>
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
        </tbody>
      </table>
    </div>
  );
};
