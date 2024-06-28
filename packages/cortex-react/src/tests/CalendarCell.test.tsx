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
import { CalendarCell } from '../components/CalendarCell';
import { useCalendarCell } from '../hooks';

jest.mock('../hooks/useCalendarCell', () => ({
  useCalendarCell: jest.fn(),
}));

jest.mock('react-stately', () => ({
  useCalendarState: jest.fn(),
  useRangeCalendarState: jest.fn(),
}));

const mockUseCalendarCell = jest.mocked(useCalendarCell);

const MockTable = ({ children }: { children: JSX.Element }) => {
  return (
    <table>
      <tbody>
        <tr>{children}</tr>
      </tbody>
    </table>
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
});
