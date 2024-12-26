import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { DatePickerInputBase } from '../components';

describe('DatePickerInputBase', () => {
  it('Should render correctly', () => {
    render(
      <DatePickerInputBase>
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
      <DatePickerInputBase label={labelExample}>
        <span>placeholder</span>
      </DatePickerInputBase>
    );
    const labelElement = screen.getByText(labelExample);
    expect(labelElement).toBeInTheDocument();
  });

  it('Should render variant error', () => {
    render(
      <DatePickerInputBase variants={{ intent: 'error' }}>
        <span>placeholder</span>
      </DatePickerInputBase>
    );
    const datePickerInputBaseElement = screen.getByTestId(
      'date-picker-input-base'
    );
    expect(datePickerInputBaseElement).toHaveClass('border-error-medium');
  });

  it('Should render variant success', () => {
    render(
      <DatePickerInputBase variants={{ intent: 'success' }}>
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
      <DatePickerInputBase variants={{ intent: 'warning' }}>
        <span>placeholder</span>
      </DatePickerInputBase>
    );
    const datePickerInputBaseElement = screen.getByTestId(
      'date-picker-input-base'
    );
    expect(datePickerInputBaseElement).toHaveClass('border-warning-medium');
  });

  it('Should click calendar icon', () => {
    const handleClickCalendarIcon = jest.fn();
    render(
      <DatePickerInputBase onClickCalendarIcon={handleClickCalendarIcon}>
        <span>placeholder</span>
      </DatePickerInputBase>
    );

    const datePickerInputBaseCalendarIconElement = screen.getByTestId(
      'date-picker-input-base-calendar-icon'
    );

    fireEvent.click(datePickerInputBaseCalendarIconElement);
    expect(handleClickCalendarIcon).toHaveBeenCalled();
  });

  it('Should click clean icon', () => {
    const handleClickCleanIcon = jest.fn();
    render(
      <DatePickerInputBase
        value={new Date()}
        onClickCleanIcon={handleClickCleanIcon}
      >
        <span>placeholder</span>
      </DatePickerInputBase>
    );

    const datePickerInputBaseCleanIconElement = screen.getByTestId(
      'date-picker-input-base-clean-icon'
    );

    fireEvent.click(datePickerInputBaseCleanIconElement);
    expect(handleClickCleanIcon).toHaveBeenCalled();
  });

  it('Should show clean icon when value exists', () => {
    render(
      <DatePickerInputBase value={new Date()}>
        <span>placeholder</span>
      </DatePickerInputBase>
    );

    const datePickerInputBaseCalendarIconElement = screen.getByTestId(
      'date-picker-input-base-clean-icon'
    );

    fireEvent.click(datePickerInputBaseCalendarIconElement);
  });

  it('Should show calendar icon correct style', () => {
    const { rerender } = render(
      <DatePickerInputBase>
        <span>placeholder</span>
      </DatePickerInputBase>
    );

    const datePickerInputBaseCalendarIconElement = screen.getByTestId(
      'date-picker-input-base-calendar-icon'
    );

    expect(datePickerInputBaseCalendarIconElement).toHaveClass(
      'mt-centi cursor-pointer'
    );

    rerender(
      <DatePickerInputBase disabled>
        <span>placeholder</span>
      </DatePickerInputBase>
    );

    expect(datePickerInputBaseCalendarIconElement).toHaveClass(
      'mt-centi text-secondary-light'
    );
  });
});
