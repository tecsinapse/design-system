import { Time } from '@internationalized/date';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { TimeFieldInput } from '../components';

describe('TimeFieldInput', () => {
  it('Should render correctly', () => {
    const value: Time = new Time(5, 10);
    render(<TimeFieldInput onChange={jest.fn} value={value} />);
    const timeFieldInput = screen.getByTestId('time-field-input');
    expect(timeFieldInput).toBeInTheDocument();
  });

  it('Should render label', () => {
    const labelExample = 'Lorem Ipsum';
    const value: Time = new Time(5, 10);
    render(
      <TimeFieldInput onChange={jest.fn} value={value} label={labelExample} />
    );
    const timeFieldInput = screen.getByText(labelExample);
    expect(timeFieldInput).toBeInTheDocument();
  });

  it('Should render variant error', () => {
    const value: Time = new Time(5, 10);
    render(
      <TimeFieldInput
        onChange={jest.fn}
        value={value}
        variants={{ intent: 'error' }}
      />
    );
    const timeFieldInput = screen.getByTestId('time-field-input');
    expect(timeFieldInput).toHaveClass('border-error-medium');
  });

  it('Should render variant sucess', () => {
    const value: Time = new Time(5, 10);
    render(
      <TimeFieldInput
        onChange={jest.fn}
        value={value}
        variants={{ intent: 'success' }}
      />
    );
    const timeFieldInput = screen.getByTestId('time-field-input');
    expect(timeFieldInput).toHaveClass('border-success-medium');
  });

  it('Should render variant warning', () => {
    const value: Time = new Time(5, 10);
    render(
      <TimeFieldInput
        onChange={jest.fn}
        value={value}
        variants={{ intent: 'warning' }}
      />
    );
    const timeFieldInput = screen.getByTestId('time-field-input');
    expect(timeFieldInput).toHaveClass('border-warning-medium');
  });
});
