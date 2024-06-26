import { CalendarDate, isSameDay } from '@internationalized/date';
import { useRef } from 'react';
import { useCalendarCell as useAriaCalendarCell } from 'react-aria';
import { CalendarState, RangeCalendarState } from 'react-stately';

interface useCalendarCellProps {
  state: CalendarState | RangeCalendarState;
  date: CalendarDate;
}

export const useCalendarCell = ({ state, date }: useCalendarCellProps) => {
  const ref = useRef(null);
  const {
    cellProps,
    buttonProps,
    isSelected,
    isOutsideVisibleRange,
    formattedDate,
  } = useAriaCalendarCell({ date }, state, ref);

  const isSelectionStart = (state as RangeCalendarState)?.highlightedRange
    ? isSameDay(date, (state as RangeCalendarState)?.highlightedRange?.start) &&
      !isSameDay(date, (state as RangeCalendarState)?.highlightedRange?.end)
    : undefined;
  const isSelectionEnd = (state as RangeCalendarState)?.highlightedRange
    ? isSameDay(date, (state as RangeCalendarState)?.highlightedRange?.end) &&
      !isSameDay(date, (state as RangeCalendarState)?.highlightedRange?.start)
    : undefined;
  const inRange =
    date > (state as RangeCalendarState)?.highlightedRange?.start &&
    date < (state as RangeCalendarState)?.highlightedRange?.end;

  return {
    ref,
    cellProps,
    buttonProps,
    isSelected,
    isOutsideVisibleRange,
    formattedDate,
    isSelectionStart,
    isSelectionEnd,
    inRange,
  };
};
