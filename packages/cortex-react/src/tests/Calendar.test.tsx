import '@testing-library/jest-dom';
import { render, renderHook, screen } from '@testing-library/react';
import React from 'react';
import { Calendar } from '../components/Calendar';
import { useCalendar } from '../hooks';

jest.mock('../components', () => ({
  CalendarHeader: () => <div data-testid="calendar-header" />,
  CalendarGrid: () => <div data-testid="calendar-grid" />,
}));

describe('Calendar', () => {
  it('Should render', () => {
    const value = new Date();
    const onChange = () => undefined;

    renderHook(() => {
      return useCalendar({
        value,
        onChange,
      });
    });

    render(<Calendar value={value} onChange={onChange} />);

    const calendarElement = screen.getByTestId('calendar-div');
    const calendarHeaderElement = screen.getByTestId('calendar-header');
    const calendarGridElement = screen.getByTestId('calendar-grid');

    expect(calendarElement).toBeInTheDocument();
    expect(calendarHeaderElement).toBeInTheDocument();
    expect(calendarGridElement).toBeInTheDocument();
  });
});
