import { useCalendarGrid as useAriaCalendarGrid } from 'react-aria';
import { CalendarState, RangeCalendarState } from 'react-stately';

interface useCalendarGridProps {
  state: CalendarState | RangeCalendarState;
}

export const useCalendarGrid = ({ state }: useCalendarGridProps) => {
  const { gridProps, headerProps, weekDays } = useAriaCalendarGrid({}, state);

  return {
    gridProps,
    headerProps,
    weekDays,
  };
};
