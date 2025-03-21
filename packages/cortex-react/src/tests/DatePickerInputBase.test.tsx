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

  it('Should click calendar button', () => {
    const handleClickCalendarIcon = jest.fn();
    render(
      <DatePickerInputBase onToggle={handleClickCalendarIcon}>
        <span>placeholder</span>
      </DatePickerInputBase>
    );

    const datePickerInputBaseCalendarButtonElement = screen.getByTestId(
      'date-picker-input-base-calendar-button'
    );

    fireEvent.click(datePickerInputBaseCalendarButtonElement);
    expect(handleClickCalendarIcon).toHaveBeenCalled();
  });

  it('Should click clean button', () => {
    const handleClickCleanIcon = jest.fn();
    render(
      <DatePickerInputBase value={new Date()} onClean={handleClickCleanIcon}>
        <span>placeholder</span>
      </DatePickerInputBase>
    );

    const datePickerInputBaseCleanButtonElement = screen.getByTestId(
      'date-picker-input-base-clean-button'
    );

    fireEvent.click(datePickerInputBaseCleanButtonElement);
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

    expect(datePickerInputBaseCalendarIconElement).toBeInTheDocument();
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
      'cursor-pointer'
    );

    rerender(
      <DatePickerInputBase disabled>
        <span>placeholder</span>
      </DatePickerInputBase>
    );

    expect(datePickerInputBaseCalendarIconElement).toHaveClass(
      'text-secondary-light cursor-default'
    );
  });

  it('Should show clean icon correct style', () => {
    const { rerender } = render(
      <DatePickerInputBase value={new Date()}>
        <span>placeholder</span>
      </DatePickerInputBase>
    );

    const datePickerInputBaseCleanIconElement = screen.getByTestId(
      'date-picker-input-base-clean-icon'
    );

    expect(datePickerInputBaseCleanIconElement).toHaveClass('cursor-pointer');

    rerender(
      <DatePickerInputBase value={new Date()} disabled>
        <span>placeholder</span>
      </DatePickerInputBase>
    );

    expect(datePickerInputBaseCleanIconElement).toHaveClass(
      'text-secondary-light cursor-default'
    );
  });

  it('Should not call clean function on clean button click when disabled', () => {
    const handleClickCleanIcon = jest.fn();
    render(
      <DatePickerInputBase
        value={new Date()}
        onClean={handleClickCleanIcon}
        disabled
      >
        <span>placeholder</span>
      </DatePickerInputBase>
    );

    const datePickerInputBaseCleanButtonElement = screen.getByTestId(
      'date-picker-input-base-clean-button'
    );

    fireEvent.click(datePickerInputBaseCleanButtonElement);
    expect(handleClickCleanIcon).not.toHaveBeenCalled();
  });

  it('Should not call calendar function on calendar button click when disabled', () => {
    const handleClickCalendarIcon = jest.fn();
    render(
      <DatePickerInputBase onToggle={handleClickCalendarIcon} disabled>
        <span>placeholder</span>
      </DatePickerInputBase>
    );

    const datePickerInputBaseCleanButtonElement = screen.getByTestId(
      'date-picker-input-base-calendar-button'
    );

    fireEvent.click(datePickerInputBaseCleanButtonElement);
    expect(handleClickCalendarIcon).not.toHaveBeenCalled();
  });
});
