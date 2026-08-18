import { clsx } from 'clsx';

export interface CalendarCellState {
  selected: boolean;
  highlighted: boolean;
  isLineEnd: boolean;
  isLineStart: boolean;
  isRangeStart: boolean;
  isRangeEnd: boolean;
}

export const calendarTitleRow =
  'flex-row items-center justify-between bg-secondary-xlight';

export const calendarControl = 'p-centi rounded-mili m-mili';

export const calendarContent = 'p-deca bg-surface-overlay';

export const calendarWeek = 'flex-row';

const leftCornerClasses = {
  none: 'rounded-tl-none rounded-bl-none',
  mili: 'rounded-tl-mili rounded-bl-mili',
} as const;

const rightCornerClasses = {
  none: 'rounded-tr-none rounded-br-none',
  mili: 'rounded-tr-mili rounded-br-mili',
} as const;

/**
 * Per-cell classes for the calendar grid. Corner rounding depends on the
 * cell's range/selection state, so the corner classes are selected from a
 * static map (never built via template literals).
 */
export const getCalendarCellClasses = ({
  selected,
  highlighted,
  isLineEnd,
  isLineStart,
  isRangeStart,
  isRangeEnd,
}: CalendarCellState) => {
  const leftRadius = (selected && !isRangeEnd) || isLineStart ? 'mili' : 'none';
  const rightRadius = (selected && !isRangeStart) || isLineEnd ? 'mili' : 'none';
  return clsx(
    'flex-1 aspect-square justify-center items-center',
    highlighted ? 'bg-primary-light rounded-none' : 'bg-transparent rounded-mili',
    leftCornerClasses[leftRadius],
    rightCornerClasses[rightRadius],
  );
};

export const calendarCellSelected =
  'flex-1 w-full h-full justify-center items-center bg-primary-medium rounded-mili';
