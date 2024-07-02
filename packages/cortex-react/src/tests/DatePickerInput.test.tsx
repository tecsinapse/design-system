import { CalendarDate } from '@internationalized/date';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { DatePickerInput, DatePickerInputProps } from '../components';
import { useDatePickerInput } from '../hooks';

jest.mock('../hooks/useDatePickerInput', () => ({
  useDatePickerInput: jest.fn(),
}));

describe('DatePickerInput', () => {
  const mockOnChange = jest.fn();
  const defaultProps: DatePickerInputProps = {
    value: new Date('2024-06-15'),
    onChange: mockOnChange,
    label: 'Select Date',
    variants: { intent: 'default' },
  };

  const mockUseDatePickerInput = {
    fieldProps: {},
    state: {
      isOpen: false,
      isInvalid: false,
      setDateValue: jest.fn(),
      close: jest.fn(),
      open: jest.fn(),
    },
    ref: React.createRef(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useDatePickerInput as jest.Mock).mockReturnValue(mockUseDatePickerInput);
  });

  it('Should render correctly with initial props', () => {
    render(<DatePickerInput {...defaultProps} />);

    expect(screen.getByTestId('date-picker-input')).toBeInTheDocument();

    expect(screen.getByText('Select Date')).toBeInTheDocument();
  });

  it('Should open and close calendar on icon click', () => {
    render(<DatePickerInput {...defaultProps} />);

    const button = screen.getByTestId('date-picker-input-base-calendar');

    fireEvent.click(button);
    expect(mockUseDatePickerInput.state.open).toHaveBeenCalled();

    mockUseDatePickerInput.state.isOpen = true;
    render(<DatePickerInput {...defaultProps} />);

    const calendarElement = screen.getByTestId('calendar-div');
    expect(calendarElement).toBeInTheDocument();

    fireEvent.click(button);
    expect(mockUseDatePickerInput.state.close).toHaveBeenCalled();
  });

  it('Should call onChange and close calendar when date is selected', () => {
    mockUseDatePickerInput.state.isOpen = true;
    render(<DatePickerInput {...defaultProps} />);

    const newDate = new CalendarDate(2024, 6, 16);

    const calendarCellSixteen = screen.getAllByText(newDate.day)[0];

    expect(calendarCellSixteen).toBeInTheDocument();

    fireEvent.click(calendarCellSixteen);

    expect(mockUseDatePickerInput.state.setDateValue).toHaveBeenCalledWith(
      new CalendarDate(2024, 6, 16)
    );
    expect(mockUseDatePickerInput.state.close).toHaveBeenCalled();
  });
});
