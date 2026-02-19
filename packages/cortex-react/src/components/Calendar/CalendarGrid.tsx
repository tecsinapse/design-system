import React from 'react';
import { CalendarState, RangeCalendarState } from 'react-stately';
import { useCalendarGrid } from '../../hooks';
import { CalendarGridBodyRows } from './CalendarGridBodyRows';
import { CalendarGridHeaderRow } from './CalendarGridHeaderRow';

interface CalendarGridProps {
  state: CalendarState | RangeCalendarState;
}

export const CalendarGrid = ({ state }: CalendarGridProps) => {
  const { gridProps, headerProps, weekDays } = useCalendarGrid({ state });

  return (
    <div
      className="bg-surface-overlay rounded-micro px-deca py-mili"
      data-testid="calendar-grid"
    >
      <table {...gridProps} className="border-separate border-spacing-y-nano">
        <thead {...headerProps}>
          <CalendarGridHeaderRow weekDays={weekDays} />
        </thead>
        <tbody>
          <CalendarGridBodyRows state={state} />
        </tbody>
      </table>
    </div>
  );
};
