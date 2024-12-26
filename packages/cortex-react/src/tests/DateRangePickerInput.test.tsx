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
    value: undefined,
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

    const button = screen.getByTestId('date-picker-input-base-calendar-button');

    fireEvent.click(button);

    const calendarElement = screen.getByTestId('calendar-range-div');
    expect(calendarElement).toBeInTheDocument();

    fireEvent.click(button);

    expect(screen.queryByTestId('calendar-div')).not.toBeInTheDocument();
  });

  it('Should call onChange and close calendar when date is selected', async () => {
    render(<DateRangePickerInput {...defaultProps} />);

    const button = screen.getByTestId('date-picker-input-base-calendar-button');
    fireEvent.click(button);

    const calendarElement = await screen.findByTestId('calendar-range-div');
    expect(calendarElement).toBeInTheDocument();

    const today = new Date();

    const calendarStartDate = new CalendarDate(
      today.getFullYear(),
      today.getMonth() + 1,
      14
    );
    const calendarEndDate = new CalendarDate(
      today.getFullYear(),
      today.getMonth() + 1,
      16
    );

    const calendarCellStartDate = screen.getByText(
      calendarStartDate.day.toString()
    );
    const calendarCellEndDate = screen.getByText(
      calendarEndDate.day.toString()
    );

    expect(calendarCellStartDate).toBeInTheDocument();
    expect(calendarCellEndDate).toBeInTheDocument();

    fireEvent.click(calendarCellStartDate);
    fireEvent.click(calendarCellEndDate);

    expect(mockUseDateRangePickerInput.state.setDateRange).toHaveBeenCalledWith(
      {
        start: calendarStartDate,
        end: calendarEndDate,
      }
    );

    expect(
      await screen.queryByTestId('calendar-range-div')
    ).not.toBeInTheDocument();
  });
});
