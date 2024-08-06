import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Button } from '../components';

describe('Button', () => {
  it('Should render correctly', () => {
    render(<Button />);
    const button = screen.getByTestId('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-primary-medium');
  });

  it('Should render disabled', () => {
    render(<Button disabled />);
    const button = screen.getByTestId('button');
    expect(button).toBeDisabled();
  });

  it('Should render correctly variant error', () => {
    render(<Button variants={{ intent: 'error' }} />);
    const button = screen.getByTestId('button');
    expect(button).toHaveClass('bg-error-medium');
  });

  it('Should render correctly variant warning', () => {
    render(<Button variants={{ intent: 'warning' }} />);
    const button = screen.getByTestId('button');
    expect(button).toHaveClass('bg-warning-medium');
  });

  it('Should render correctly variant success', () => {
    render(<Button variants={{ intent: 'success' }} />);
    const button = screen.getByTestId('button');
    expect(button).toHaveClass('bg-success-medium');
  });

  it('Should render correctly variant info', () => {
    render(<Button variants={{ intent: 'info' }} />);
    const button = screen.getByTestId('button');
    expect(button).toHaveClass('bg-info-medium');
  });

  it('Should render correctly variant secondary', () => {
    render(<Button variants={{ intent: 'secondary' }} />);
    const button = screen.getByTestId('button');
    expect(button).toHaveClass('bg-secondary-medium');
  });

  it('Should render correctly variant outlined', () => {
    render(<Button variants={{ variant: 'outline' }} />);
    const button = screen.getByTestId('button');
    expect(button).toHaveClass('border-primary-medium');
  });

  it('Should render correctly variant text', () => {
    render(<Button variants={{ variant: 'text' }} />);
    const button = screen.getByTestId('button');
    expect(button).not.toHaveClass('border-primary-medium');
    expect(button).not.toHaveClass('bg-primary-medium');
  });

  it('Should render correctly size default', () => {
    render(<Button variants={{ size: 'default' }} />);
    const button = screen.getByTestId('button');
    expect(button).toHaveClass('min-h-[44px]');
  });

  it('Should render correctly size small', () => {
    render(<Button variants={{ size: 'small' }} />);
    const button = screen.getByTestId('button');
    expect(button).toHaveClass('min-h-[34px]');
  });

  it('Should render correctly size square', () => {
    render(<Button variants={{ size: 'square' }} />);
    const button = screen.getByTestId('button');
    expect(button).toHaveClass('aspect-square');
  });

  it('Should render correctly size circle', () => {
    render(<Button variants={{ size: 'circle' }} />);
    const button = screen.getByTestId('button');
    expect(button).toHaveClass('rounded-full');
  });
});
