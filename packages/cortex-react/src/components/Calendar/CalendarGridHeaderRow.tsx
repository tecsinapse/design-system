import React from 'react';
import { THeadCell } from '../Table';

interface CalendarGridHeaderRowProps {
  weekDays: string[];
}

export const CalendarGridHeaderRow = ({
  weekDays,
}: CalendarGridHeaderRowProps) => {
  return (
    <tr data-testid={'calendar-grid-header-row'}>
      {weekDays.map((day, index) => (
        <THeadCell key={index}>{day}</THeadCell>
      ))}
    </tr>
  );
};
