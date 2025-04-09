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

  const rangeStateHighlitedRange = (state as RangeCalendarState)
    ?.highlightedRange;

  const isSameDayStart =
    rangeStateHighlitedRange && date
      ? isSameDay(date, rangeStateHighlitedRange.start)
      : undefined;
  const isSameDayEnd =
    rangeStateHighlitedRange && date
      ? isSameDay(date, rangeStateHighlitedRange.end)
      : undefined;

  const isSelectionStart = isSameDayStart && !isSameDayEnd;
  const isSelectionEnd = isSameDayEnd && !isSameDayStart;
  const inRange =
    rangeStateHighlitedRange &&
    date > rangeStateHighlitedRange?.start &&
    date < rangeStateHighlitedRange?.end;

  return {
    ref,
    cellProps,
    buttonProps,
    isSelected,
    isOutsideVisibleRange,
    formattedDate,
    isSelectionStart,
    isSelectionEnd,
    inRange: Boolean(inRange),
  };
};
