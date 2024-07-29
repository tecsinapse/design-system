import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { DatePickerInputBase } from '../components';

describe('DatePickerInputBase', () => {
  it('Should render correctly', () => {
    render(
      <DatePickerInputBase onClickCalendar={jest.fn}>
        <span>placeholder</span>
      </DatePickerInputBase>
    );

    const datePickerInputBaseElement = screen.getByTestId(
      'date-picker-input-base'
    );

    expect(datePickerInputBaseElement).toBeInTheDocument();
  });

  it('Should render label', () => {
    const labelExample = 'Lorem Ipsum';
    render(
      <DatePickerInputBase onClickCalendar={jest.fn} label={labelExample}>
        <span>placeholder</span>
      </DatePickerInputBase>
    );
    const datePickerInputBaseElement = screen.getByText(labelExample);
    expect(datePickerInputBaseElement).toBeInTheDocument();
  });

  it('Should render variant error', () => {
    render(
      <DatePickerInputBase
        onClickCalendar={jest.fn}
        variants={{ intent: 'error' }}
      >
        <span>placeholder</span>
      </DatePickerInputBase>
    );
    const datePickerInputBaseElement = screen.getByTestId(
      'date-picker-input-base'
    );
    expect(datePickerInputBaseElement).toHaveClass('border-error-medium');
  });

  it('Should render variant sucess', () => {
    render(
      <DatePickerInputBase
        onClickCalendar={jest.fn}
        variants={{ intent: 'success' }}
      >
        <span>placeholder</span>
      </DatePickerInputBase>
    );
    const datePickerInputBaseElement = screen.getByTestId(
      'date-picker-input-base'
    );
    expect(datePickerInputBaseElement).toHaveClass('border-success-medium');
  });

  it('Should render variant warning', () => {
    render(
      <DatePickerInputBase
        onClickCalendar={jest.fn}
        variants={{ intent: 'warning' }}
      >
        <span>placeholder</span>
      </DatePickerInputBase>
    );
    const datePickerInputBaseElement = screen.getByTestId(
      'date-picker-input-base'
    );
    expect(datePickerInputBaseElement).toHaveClass('border-warning-medium');
  });

  it('Should click calendar icon', () => {
    const handleClickCalendar = jest.fn();

    render(
      <DatePickerInputBase
        onClickCalendar={handleClickCalendar}
        variants={{ intent: 'warning' }}
      >
        <span>placeholder</span>
      </DatePickerInputBase>
    );

    const datePickerInputBaseCalendarIconElement = screen.getByTestId(
      'date-picker-input-base-calendar'
    );

    fireEvent.click(datePickerInputBaseCalendarIconElement);

    expect(handleClickCalendar).toHaveBeenCalled();
  });
});
