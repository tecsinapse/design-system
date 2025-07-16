import {
  CalendarDate,
  getLocalTimeZone,
  isSameDay,
  today,
} from '@internationalized/date';
import { useRef } from 'react';
import { useCalendarCell as useAriaCalendarCell } from 'react-aria';
import { CalendarState, RangeCalendarState } from 'react-stately';
import { useCalendarContext } from '../provider';

interface useCalendarCellProps {
  state: CalendarState | RangeCalendarState;
  date: CalendarDate;
}

export const useCalendarCell = ({ state, date }: useCalendarCellProps) => {
  const { isTodayHighlited } = useCalendarContext();
  const ref = useRef(null);
  const {
    cellProps,
    buttonProps,
    isSelected,
    isOutsideVisibleRange,
    formattedDate,
    isDisabled,
  } = useAriaCalendarCell({ date }, state, ref);

  const isToday = isTodayHighlited
    ? isSameDay(date, today(getLocalTimeZone()))
    : false;

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
    isToday,
    isDisabled,
  };
};
