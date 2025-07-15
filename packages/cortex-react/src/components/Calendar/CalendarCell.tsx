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
    isToday,
    isDisabled,
  } = useCalendarCell({ state, date });

  return (
    <Td
      {...cellProps}
      data-testid={'calendar-cell-td'}
      className={cell({
        isDisabled: isOutsideVisibleRange || isDisabled,
        isSelected,
        isSelectionStart,
        isSelectionEnd,
        inRange,
        isToday,
      })}
    >
      <div {...buttonProps} ref={ref} className={button({ isDisabled })}>
        {formattedDate}
      </div>
    </Td>
  );
};
