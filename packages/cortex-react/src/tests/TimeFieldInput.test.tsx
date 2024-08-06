import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TimeFieldInput } from '../components';

describe('TimeFieldInput', () => {
  it('Should render correctly', () => {
    render(
      <TimeFieldInput onChange={jest.fn} value={{ minute: 10, hour: 5 }} />
    );
    const timeFieldInput = screen.getByTestId('time-field-input');
    expect(timeFieldInput).toBeInTheDocument();
  });

  it('Should render label', () => {
    const labelExample = 'Lorem Ipsum';
    render(
      <TimeFieldInput
        onChange={jest.fn}
        value={{ minute: 10, hour: 5 }}
        label={labelExample}
      />
    );
    const timeFieldInput = screen.getByText(labelExample);
    expect(timeFieldInput).toBeInTheDocument();
  });

  it('Should render variant error', () => {
    render(
      <TimeFieldInput
        onChange={jest.fn}
        value={{ minute: 10, hour: 5 }}
        variants={{ intent: 'error' }}
      />
    );
    const timeFieldInput = screen.getByTestId('time-field-input');
    expect(timeFieldInput).toHaveClass('border-error-medium');
  });

  it('Should render variant sucess', () => {
    render(
      <TimeFieldInput
        onChange={jest.fn}
        value={{ minute: 10, hour: 5 }}
        variants={{ intent: 'success' }}
      />
    );
    const timeFieldInput = screen.getByTestId('time-field-input');
    expect(timeFieldInput).toHaveClass('border-success-medium');
  });

  it('Should render variant warning', () => {
    render(
      <TimeFieldInput
        onChange={jest.fn}
        value={{ minute: 10, hour: 5 }}
        variants={{ intent: 'warning' }}
      />
    );
    const timeFieldInput = screen.getByTestId('time-field-input');
    expect(timeFieldInput).toHaveClass('border-warning-medium');
  });
});
