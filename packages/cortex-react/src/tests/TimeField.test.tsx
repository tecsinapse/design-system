import { Time } from '@internationalized/date';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { TimeField } from '../components';

jest.mock('../components/DatePicker/DateSegment', () => ({
  DateSegment: ({ segment }: { segment: { text: string } }) => (
    <span>{segment.text}</span>
  ),
}));

describe('TimeField', () => {
  it('renders TimeField component', () => {
    const mockOnChange = jest.fn();
    const value: Time = new Time(10, 30);

    render(<TimeField value={value} onChange={mockOnChange} />);

    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();
  });

  it('Should call onChange when value change', () => {
    const mockOnChange = jest.fn();
    const value: Time = new Time(10, 30);

    render(<TimeField value={value} onChange={mockOnChange} />);

    const newHour = 11;
    const newMinute = 45;
    fireEvent.click(screen.getByText('10'));
    mockOnChange({ hour: newHour, minute: value.minute });

    fireEvent.click(screen.getByText('30'));
    mockOnChange({ hour: newHour, minute: newMinute });

    expect(mockOnChange).toHaveBeenCalledWith({
      hour: newHour,
      minute: value.minute,
    });
    expect(mockOnChange).toHaveBeenCalledWith({
      hour: newHour,
      minute: newMinute,
    });
  });
});
