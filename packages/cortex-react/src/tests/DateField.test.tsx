import { CalendarDate } from '@internationalized/date';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { DateValue } from 'react-aria';
import { DateField } from '../components';

jest.mock('../components/DatePicker/DateSegment', () => ({
  DateSegment: ({ segment }: { segment: { text: string } }) => (
    <span>{segment.text}</span>
  ),
}));

describe('DateField', () => {
  const mockOnChange = jest.fn();
  const value: DateValue = new CalendarDate(2024, 6, 4);

  it('renders DateField component', () => {
    render(<DateField value={value} onChange={mockOnChange} />);

    expect(screen.getByText('2024')).toBeInTheDocument();
    expect(screen.getByText('6')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
  });

  it('Should call onChange when value change', () => {
    render(<DateField value={value} onChange={mockOnChange} />);

    const newYear = 2025;
    const newMonth = 8;
    const newDay = 24;

    fireEvent.click(screen.getByText('2024'));
    mockOnChange({ year: newYear, month: value.month, day: value.day });

    fireEvent.click(screen.getByText('6'));
    mockOnChange({ year: newYear, month: newMonth, day: value.day });

    fireEvent.click(screen.getByText('4'));
    mockOnChange({ year: newYear, month: newMonth, day: newDay });

    expect(mockOnChange).toHaveBeenCalledWith({
      year: newYear,
      month: value.month,
      day: value.day,
    });
    expect(mockOnChange).toHaveBeenCalledWith({
      year: newYear,
      month: newMonth,
      day: value.day,
    });
    expect(mockOnChange).toHaveBeenCalledWith({
      year: newYear,
      month: newMonth,
      day: newDay,
    });
  });
});
