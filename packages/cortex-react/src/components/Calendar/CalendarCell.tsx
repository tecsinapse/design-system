import { CalendarDate } from '@internationalized/date';
import React from 'react';
import { CalendarState, RangeCalendarState } from 'react-stately';
import { useCalendarCell } from '../../hooks';
import { calendarCell } from '../../styles';
import { Td } from '../Table';

interface CalendarCellProps {
  state: CalendarState | RangeCalendarState;
  date: CalendarDate;
}

const { cell, button } = calendarCell();

export const CalendarCell = ({ state, date }: CalendarCellProps) => {
  const {
    ref,
    cellProps,
    buttonProps,
    isSelected,
    isOutsideVisibleRange,
    formattedDate,
    isSelectionStart,
    isSelectionEnd,
    inRange,
  } = useCalendarCell({ state, date });

  return (
    <Td
      {...cellProps}
      data-testid={'calendar-cell-td'}
      className={cell({
        isOutsideVisibleRange,
        isSelected,
        isSelectionStart,
        isSelectionEnd,
        inRange,
      })}
    >
      <div
        {...buttonProps}
        ref={ref}
        className={button({ isOutsideVisibleRange })}
      >
        {formattedDate}
      </div>
    </Td>
  );
};
