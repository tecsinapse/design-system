import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { Checkbox, CheckboxRef } from '../components';

describe('Checkbox', () => {
  it('should render the checkbox input', () => {
    render(<Checkbox data-testid="checkbox" />);
    const checkbox = screen.getByTestId('checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveAttribute('type', 'checkbox');
  });

  it('should set the indeterminate state based on prop', () => {
    render(<Checkbox indeterminate data-testid="checkbox" />);
    const checkbox = screen.getByTestId('checkbox') as HTMLInputElement;
    expect(checkbox.indeterminate).toBe(true);
  });

  it('should allow external ref to call setIndeterminate function', () => {
    const ref = React.createRef<CheckboxRef>();

    render(<Checkbox ref={ref} data-testid="checkbox" />);
    const checkbox = screen.getByTestId('checkbox') as HTMLInputElement;

    ref.current?.setIndeterminate(true);
    expect(checkbox.indeterminate).toBe(true);

    ref.current?.setIndeterminate(false);
    expect(checkbox.indeterminate).toBe(false);
  });

  it('should reset indeterminate and checked state when setIndeterminate is called', () => {
    const ref = React.createRef<CheckboxRef>();
    render(<Checkbox ref={ref} data-testid="checkbox" />);

    const checkbox = screen.getByTestId('checkbox') as HTMLInputElement;
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);

    ref.current?.setIndeterminate(true);
    expect(checkbox.indeterminate).toBe(true);
    expect(checkbox.checked).toBe(false);
  });
});
