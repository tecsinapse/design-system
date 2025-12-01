import { parseDate } from '@internationalized/date';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import {
  CalendarState,
  RangeCalendarState,
  useCalendarState,
  useRangeCalendarState,
} from 'react-stately';
import { CalendarCell } from '../components/Calendar/CalendarCell';
import { useCalendarCell } from '../hooks';
import { CalendarProvider } from '../provider';

jest.mock('../hooks/useCalendarCell', () => ({
  useCalendarCell: jest.fn(),
}));

jest.mock('react-stately', () => ({
  useCalendarState: jest.fn(),
  useRangeCalendarState: jest.fn(),
}));

const mockUseCalendarCell = jest.mocked(useCalendarCell);

const MockTable = ({ children }: { children: React.ReactNode }) => {
  return (
    <CalendarProvider isTodayHighlited={false}>
      <table>
        <tbody>
          <tr>{children}</tr>
        </tbody>
      </table>
    </CalendarProvider>
  );
};

const useCalendarMockReturn = {
  isSelected: false,
  buttonProps: {},
  cellProps: {},
  formattedDate: '8',
  inRange: false,
  isOutsideVisibleRange: false,
  isSelectionEnd: false,
  isSelectionStart: false,
  ref: { current: null },
  isToday: false,
  isDisabled: false,
};

describe('CalendarCell', () => {
  let calendarStateMock;
  let rangeCalendarStateMock;

  beforeEach(() => {
    calendarStateMock = jest
      .mocked(useCalendarState)
      .mockReturnValue({} as CalendarState);
    rangeCalendarStateMock = jest
      .mocked(useRangeCalendarState)
      .mockReturnValue({} as RangeCalendarState);
  });

  it('Should apply text-secondary-light on outside dates ', () => {
    mockUseCalendarCell.mockReturnValue({
      ...useCalendarMockReturn,
      isOutsideVisibleRange: true,
    });

    render(
      <MockTable>
        <CalendarCell
          state={calendarStateMock}
          date={parseDate('2024-06-08')}
        />
      </MockTable>
    );

    const calendarCellElement = screen.getByTestId('calendar-cell-td');

    expect(calendarCellElement).toHaveClass('text-secondary-light');
  });

  it('Should apply text-white on selected date', () => {
    mockUseCalendarCell.mockReturnValue({
      ...useCalendarMockReturn,
      isSelected: true,
    });

    render(
      <MockTable>
        <CalendarCell
          state={calendarStateMock}
          date={parseDate('2024-06-08')}
        />
      </MockTable>
    );

    const calendarCellElement = screen.getByTestId('calendar-cell-td');

    expect(calendarCellElement).toHaveClass('text-white');
  });

  it('Should apply text-white on range start selected date', () => {
    mockUseCalendarCell.mockReturnValue({
      ...useCalendarMockReturn,
      isSelectionStart: true,
    });

    render(
      <MockTable>
        <CalendarCell
          state={rangeCalendarStateMock}
          date={parseDate('2024-06-08')}
        />
      </MockTable>
    );

    const calendarCellElement = screen.getByTestId('calendar-cell-td');

    expect(calendarCellElement).toHaveClass('text-white');
  });

  it('Should apply text-white on range end selected date', () => {
    mockUseCalendarCell.mockReturnValue({
      ...useCalendarMockReturn,
      isSelectionEnd: true,
    });

    render(
      <MockTable>
        <CalendarCell
          state={rangeCalendarStateMock}
          date={parseDate('2024-06-08')}
        />
      </MockTable>
    );

    const calendarCellElement = screen.getByTestId('calendar-cell-td');

    expect(calendarCellElement).toHaveClass('text-white');
  });

  it('Should apply text-black on month not selected dates ', () => {
    mockUseCalendarCell.mockReturnValue({ ...useCalendarMockReturn });

    render(
      <MockTable>
        <CalendarCell
          state={calendarStateMock}
          date={parseDate('2024-06-08')}
        />
      </MockTable>
    );

    const calendarCellElement = screen.getByTestId('calendar-cell-td');

    expect(calendarCellElement).toHaveClass('text-black');
  });

  it('Should apply day indicator if isTodayHighlited is true', () => {
    mockUseCalendarCell.mockReturnValue({
      ...useCalendarMockReturn,
      isToday: true,
    });

    render(
      <MockTable>
        <CalendarCell
          state={calendarStateMock}
          date={parseDate('2024-06-08')}
        />
      </MockTable>
    );

    const calendarCellElement = screen.getByTestId('calendar-cell-td');

    expect(calendarCellElement).toHaveClass('border-primary-light border-2');
  });

  it('Should not apply day indicator if isTodayHighlited is false', () => {
    mockUseCalendarCell.mockReturnValue({
      ...useCalendarMockReturn,
      isToday: false,
    });

    render(
      <MockTable>
        <CalendarCell
          state={calendarStateMock}
          date={parseDate('2024-06-08')}
        />
      </MockTable>
    );

    const calendarCellElement = screen.getByTestId('calendar-cell-td');

    expect(calendarCellElement).not.toHaveClass(
      'border-primary-light border-2'
    );
  });
});
