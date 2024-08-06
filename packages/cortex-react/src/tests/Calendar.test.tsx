import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { Calendar } from '../components';
import { useCalendar } from '../hooks';

jest.mock('../hooks/useCalendar', () => ({
  useCalendar: jest.fn(),
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

describe('Calendar', () => {
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
    (useCalendar as jest.Mock).mockReturnValue(mockUseCalendar);
  });

  it('Should render', () => {
    render(<Calendar value={new Date('2024-06-15')} onChange={mockOnChange} />);

    const calendarElement = screen.getByTestId('calendar-div');
    const calendarHeaderElement = screen.getByTestId('calendar-header');
    const calendarGridElement = screen.getByTestId('calendar-grid');

    expect(calendarElement).toBeInTheDocument();
    expect(calendarHeaderElement).toBeInTheDocument();
    expect(calendarGridElement).toBeInTheDocument();
  });

  it('Should call onClickPreviousPage and onClickNextPage on button clicks', () => {
    render(<Calendar value={new Date('2024-06-15')} onChange={mockOnChange} />);

    const prevButton = screen.getByText('Prev');
    const nextButton = screen.getByText('Next');

    fireEvent.click(prevButton);
    expect(mockUseCalendar.state.focusPreviousPage).toHaveBeenCalled();

    fireEvent.click(nextButton);
    expect(mockUseCalendar.state.focusNextPage).toHaveBeenCalled();
  });
});
