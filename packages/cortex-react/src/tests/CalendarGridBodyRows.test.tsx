import { createCalendar } from '@internationalized/date';
import '@testing-library/jest-dom';
import { render, renderHook, screen } from '@testing-library/react';
import React from 'react';
import { useCalendarState } from 'react-stately';
import { CalendarGridBodyRows } from '../components/Calendar/CalendarGridBodyRows';

jest.mock('../components/Calendar/CalendarCell', () => ({
  CalendarCell: () => <div data-testid="calendar-cell" />,
}));

const weekDays = 6;
const daysInWeek = 7;
const totalCells = weekDays * daysInWeek;

describe('CalendarGridBodyRows', () => {
  it('Should render 42 day cells', () => {
    const { result } = renderHook(() => {
      return useCalendarState({
        locale: 'pt-br',
        createCalendar,
      });
    });

    render(
      <table>
        <tbody>
          <CalendarGridBodyRows state={result.current} />
        </tbody>
      </table>
    );

    const calendarGridBodyRowsCellsRendered =
      screen.getAllByTestId('calendar-cell');

    expect(calendarGridBodyRowsCellsRendered.length).toBe(totalCells);
  });
});
