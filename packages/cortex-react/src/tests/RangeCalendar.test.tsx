import '@testing-library/jest-dom';
import { fireEvent, render, renderHook, screen } from '@testing-library/react';
import React from 'react';
import { RangeCalendar } from '../components/';
import { useRangeCalendar } from '../hooks';

jest.mock('../hooks/useRangeCalendar', () => ({
  useRangeCalendar: jest.fn(),
}));

jest.mock('../components/Calendar/CalendarGrid', () => ({
  CalendarGrid: jest.fn(() => <div data-testid="calendar-grid" />),
}));

jest.mock('../components/Calendar/CalendarHeader', () => ({
  CalendarHeader: jest.fn(({ onClickPrevButton, onClickNextButton, title }) => (
    <div data-testid="calendar-header">
      <button onClick={onClickPrevButton}>Prev</button>
      <span>{title}</span>
      <button onClick={onClickNextButton}>Next</button>
    </div>
  )),
}));

describe('RangeCalendar', () => {
  const mockOnChange = jest.fn();
  const mockUseCalendar = {
    calendarProps: {},
    title: 'June 2024',
    state: {
      focusPreviousPage: jest.fn(),
      focusNextPage: jest.fn(),
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useRangeCalendar as jest.Mock).mockReturnValue(mockUseCalendar);
  });

  it('Should render', () => {
    const value = { start: new Date(), end: new Date() };
    const onChange = jest.fn();

    renderHook(() => {
      return useRangeCalendar({
        value,
        onChange,
      });
    });

    render(<RangeCalendar value={value} onChange={onChange} />);

    const calendarElement = screen.getByTestId('calendar-range-div');
    const calendarHeaderElement = screen.getByTestId('calendar-header');
    const calendarGridElement = screen.getByTestId('calendar-grid');

    expect(calendarElement).toBeInTheDocument();
    expect(calendarHeaderElement).toBeInTheDocument();
    expect(calendarGridElement).toBeInTheDocument();
  });

  it('Should call onClickPreviousPage and onClickNextPage on button clicks', () => {
    render(
      <RangeCalendar
        value={{ start: new Date(), end: new Date() }}
        onChange={mockOnChange}
      />
    );

    const prevButton = screen.getByText('Prev');
    const nextButton = screen.getByText('Next');

    fireEvent.click(prevButton);
    expect(mockUseCalendar.state.focusPreviousPage).toHaveBeenCalled();

    fireEvent.click(nextButton);
    expect(mockUseCalendar.state.focusNextPage).toHaveBeenCalled();
  });
});
