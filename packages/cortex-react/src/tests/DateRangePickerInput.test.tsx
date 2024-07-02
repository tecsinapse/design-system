import { CalendarDate } from '@internationalized/date';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { DateRangePickerInput, DateRangePickerInputProps } from '../components';
import { useDateRangePickerInput } from '../hooks';

jest.mock('../hooks/useDateRangePickerInput', () => ({
  useDateRangePickerInput: jest.fn(),
}));

describe('DateRangePickerInput', () => {
  const mockOnChange = jest.fn();
  const defaultProps: DateRangePickerInputProps = {
    value: { start: new Date(2024, 6, 3), end: new Date(2024, 6, 3) },
    onChange: mockOnChange,
    label: 'Select Date',
    variants: { intent: 'default' },
  };

  const mockUseDateRangePickerInput = {
    fieldProps: {},
    state: {
      isOpen: false,
      isInvalid: false,
      setDateRange: jest.fn(),
      close: jest.fn(),
      open: jest.fn(),
    },
    ref: React.createRef(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useDateRangePickerInput as jest.Mock).mockReturnValue(
      mockUseDateRangePickerInput
    );
  });

  it('Should render correctly with initial props', () => {
    render(<DateRangePickerInput {...defaultProps} />);

    expect(screen.getByTestId('date-range-picker-input')).toBeInTheDocument();

    expect(screen.getByText('Select Date')).toBeInTheDocument();
  });

  it('Should open and close calendar on icon click', () => {
    render(<DateRangePickerInput {...defaultProps} />);

    const button = screen.getByTestId('date-picker-input-base-calendar');

    fireEvent.click(button);
    expect(mockUseDateRangePickerInput.state.open).toHaveBeenCalled();

    mockUseDateRangePickerInput.state.isOpen = true;
    render(<DateRangePickerInput {...defaultProps} />);

    const calendarElement = screen.getByTestId('calendar-range-div');
    expect(calendarElement).toBeInTheDocument();

    fireEvent.click(button);
    expect(mockUseDateRangePickerInput.state.close).toHaveBeenCalled();
  });

  it('Should call onChange and close calendar when date is selected', () => {
    render(<DateRangePickerInput {...defaultProps} />);

    mockUseDateRangePickerInput.state.isOpen = true;
    render(<DateRangePickerInput {...defaultProps} />);

    const newStartDate = new CalendarDate(2024, 7, 16);
    const newEndDate = new CalendarDate(2024, 7, 18);

    const calendarCellStartDate = screen.getAllByText(newStartDate.day)[0];
    const calendarCellEndDate = screen.getAllByText(newEndDate.day)[0];

    expect(calendarCellStartDate).toBeInTheDocument();
    expect(calendarCellEndDate).toBeInTheDocument();

    fireEvent.click(calendarCellStartDate);
    fireEvent.click(calendarCellEndDate);

    expect(mockUseDateRangePickerInput.state.setDateRange).toHaveBeenCalledWith(
      {
        start: newStartDate,
        end: newEndDate,
      }
    );
    expect(mockUseDateRangePickerInput.state.close).toHaveBeenCalled();
  });
});
