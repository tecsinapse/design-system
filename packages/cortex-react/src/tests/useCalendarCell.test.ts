import { createCalendar, parseDate } from '@internationalized/date';
import { renderHook } from '@testing-library/react';
import { useCalendarCell as useAriaCalendarCell } from 'react-aria';
import {
  CalendarState,
  RangeCalendarState,
  useCalendarState,
  useRangeCalendarState,
} from 'react-stately';
import { useCalendarCell } from '../hooks/useCalendarCell';

jest.mock('react-aria', () => ({
  useCalendarCell: jest.fn(),
}));

const mockUseAriaCalendarCell = jest.mocked(useAriaCalendarCell);

describe('useCalendarCell', () => {
  let state: CalendarState | RangeCalendarState;

  beforeEach(() => {
    mockUseAriaCalendarCell.mockReturnValue({
      cellProps: { role: 'gridcell' },
      buttonProps: { role: 'button' },
      isSelected: false,
      isOutsideVisibleRange: false,
      formattedDate: '10',
      isDisabled: false,
      isFocused: false,
      isInvalid: false,
      isPressed: false,
      isUnavailable: false,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Should return correct props for one selected date', () => {
    const date = parseDate('2024-06-10');

    const { result } = renderHook(() => {
      state = useCalendarState({
        locale: 'pt-br',
        createCalendar,
        defaultValue: date,
      });
      return useCalendarCell({ state, date });
    });

    expect(result.current.inRange).toBe(false);
    expect(result.current.isSelectionStart).toBe(undefined);
    expect(result.current.isSelectionEnd).toBe(undefined);
  });

  test('Should return correct props for in range date', () => {
    const startDate = parseDate('2024-06-10');
    const endDate = parseDate('2024-06-20');
    const inRangeDate = parseDate('2024-06-15');

    const { result } = renderHook(() => {
      state = useRangeCalendarState({
        locale: 'pt-br',
        createCalendar,
        defaultValue: {
          start: startDate,
          end: endDate,
        },
      });
      return useCalendarCell({ state, date: inRangeDate });
    });

    expect(result.current.inRange).toBe(true);
    expect(result.current.isSelectionStart).toBe(false);
    expect(result.current.isSelectionEnd).toBe(false);
  });

  test('Should return correct props for not in range date', () => {
    const startDate = parseDate('2024-06-10');
    const endDate = parseDate('2024-06-20');
    const inRangeDate = parseDate('2024-06-24');

    const { result } = renderHook(() => {
      state = useRangeCalendarState({
        locale: 'pt-br',
        createCalendar,
        defaultValue: {
          start: startDate,
          end: endDate,
        },
      });
      return useCalendarCell({ state, date: inRangeDate });
    });

    expect(result.current.inRange).toBe(false);
    expect(result.current.isSelectionStart).toBe(false);
    expect(result.current.isSelectionEnd).toBe(false);
  });

  test('Should return correct props for startDate', () => {
    const startDate = parseDate('2024-06-15');
    const endDate = parseDate('2024-06-20');

    const { result } = renderHook(() => {
      state = useRangeCalendarState({
        locale: 'pt-br',
        createCalendar,
        defaultValue: {
          start: startDate,
          end: endDate,
        },
      });
      return useCalendarCell({ state, date: startDate });
    });

    expect(result.current.isSelectionStart).toBe(true);
    expect(result.current.isSelectionEnd).toBe(false);
    expect(result.current.inRange).toBe(false);
  });

  test('Should return correct props for endDate', () => {
    const startDate = parseDate('2024-06-15');
    const endDate = parseDate('2024-06-20');

    const { result } = renderHook(() => {
      state = useRangeCalendarState({
        locale: 'pt-br',
        createCalendar,
        defaultValue: {
          start: startDate,
          end: endDate,
        },
      });
      return useCalendarCell({ state, date: endDate });
    });

    expect(result.current.isSelectionStart).toBe(false);
    expect(result.current.isSelectionEnd).toBe(true);
    expect(result.current.inRange).toBe(false);
  });
});
