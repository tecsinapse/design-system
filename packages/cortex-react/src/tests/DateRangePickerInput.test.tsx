import { CalendarDateTime } from '@internationalized/date';
import type { Mock } from 'vitest';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { DateRangePickerInput, DateRangePickerInputProps } from '../components';
import { useDateRangePickerInput } from '../hooks';

vi.mock('../hooks/useDateRangePickerInput', () => ({
  useDateRangePickerInput: vi.fn(),
}));

describe('DateRangePickerInput', () => {
  const mockOnChange = vi.fn();
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
      setDateRange: vi.fn(),
      close: vi.fn(),
      open: vi.fn(),
    },
    ref: React.createRef(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (useDateRangePickerInput as Mock).mockReturnValue(
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

    const calendarStartDate = new CalendarDateTime(
      today.getFullYear(),
      today.getMonth() + 1,
      14
    );
    const calendarEndDate = new CalendarDateTime(
      today.getFullYear(),
      today.getMonth() + 1,
      16
    );

    const calendarCellStartDate = screen.getAllByText(
      calendarStartDate.day.toString()
    )[0];
    const calendarCellEndDate = screen.getByText(
      calendarEndDate.day.toString()
    );

    expect(calendarCellStartDate).toBeInTheDocument();
    expect(calendarCellEndDate).toBeInTheDocument();

    fireEvent.click(calendarCellStartDate);
    fireEvent.click(calendarCellEndDate);

    expect(mockUseDateRangePickerInput.state.setDateRange).toHaveBeenCalled();

    expect(
      await screen.queryByTestId('calendar-range-div')
    ).not.toBeInTheDocument();
  });
});
