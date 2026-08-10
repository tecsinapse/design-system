import '@testing-library/jest-dom';
import type { Mock } from 'vitest';
import { fireEvent, render, renderHook, screen } from '@testing-library/react';
import React from 'react';
import { RangeCalendar } from '../components/';
import { useRangeCalendar } from '../hooks';

vi.mock('../hooks/useRangeCalendar', () => ({
  useRangeCalendar: vi.fn(),
}));

vi.mock('../components/Calendar/CalendarGrid', () => ({
  CalendarGrid: vi.fn(() => <div data-testid="calendar-grid" />),
}));

vi.mock('../components/Calendar/CalendarHeader', () => ({
  CalendarHeader: vi.fn(({ onClickPrevButton, onClickNextButton, title }) => (
    <div data-testid="calendar-header">
      <button onClick={onClickPrevButton}>Prev</button>
      <span>{title}</span>
      <button onClick={onClickNextButton}>Next</button>
    </div>
  )),
}));

describe('RangeCalendar', () => {
  const mockOnChange = vi.fn();
  const mockUseCalendar = {
    calendarProps: {},
    title: 'June 2024',
    state: {
      focusPreviousPage: vi.fn(),
      focusNextPage: vi.fn(),
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (useRangeCalendar as Mock).mockReturnValue(mockUseCalendar);
  });

  it('Should render', () => {
    const value = { start: new Date(), end: new Date() };
    const onChange = vi.fn();

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
