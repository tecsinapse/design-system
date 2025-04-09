import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Button } from '../components';

describe('Button', () => {
  it('Should render correctly', () => {
    render(<Button data-testid="button" />);
    const button = screen.getByTestId('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-primary-medium');
  });

  it('Should render disabled', () => {
    render(<Button disabled data-testid="button" />);
    const button = screen.getByTestId('button');
    expect(button).toBeDisabled();
  });

  it('Should render correctly variant error', () => {
    render(<Button variants={{ intent: 'error' }} data-testid="button" />);
    const button = screen.getByTestId('button');
    expect(button).toHaveClass('bg-error-medium');
  });

  it('Should render correctly variant warning', () => {
    render(<Button variants={{ intent: 'warning' }} data-testid="button" />);
    const button = screen.getByTestId('button');
    expect(button).toHaveClass('bg-warning-medium');
  });

  it('Should render correctly variant success', () => {
    render(<Button variants={{ intent: 'success' }} data-testid="button" />);
    const button = screen.getByTestId('button');
    expect(button).toHaveClass('bg-success-medium');
  });

  it('Should render correctly variant info', () => {
    render(<Button variants={{ intent: 'info' }} data-testid="button" />);
    const button = screen.getByTestId('button');
    expect(button).toHaveClass('bg-info-medium');
  });

  it('Should render correctly variant secondary', () => {
    render(<Button variants={{ intent: 'secondary' }} data-testid="button" />);
    const button = screen.getByTestId('button');
    expect(button).toHaveClass('bg-secondary-medium');
  });

  it('Should render correctly variant outlined', () => {
    render(<Button variants={{ variant: 'outline' }} data-testid="button" />);
    const button = screen.getByTestId('button');
    expect(button).toHaveClass('border-primary-medium');
  });

  it('Should render correctly variant text', () => {
    render(<Button variants={{ variant: 'text' }} data-testid="button" />);
    const button = screen.getByTestId('button');
    expect(button).not.toHaveClass('border-primary-medium');
    expect(button).not.toHaveClass('bg-primary-medium');
  });

  it('Should render correctly size default', () => {
    render(<Button variants={{ size: 'default' }} data-testid="button" />);
    const button = screen.getByTestId('button');
    expect(button).toHaveClass('min-h-[44px]');
  });

  it('Should render correctly size small', () => {
    render(<Button variants={{ size: 'small' }} data-testid="button" />);
    const button = screen.getByTestId('button');
    expect(button).toHaveClass('min-h-[34px]');
  });

  it('Should render correctly size square', () => {
    render(<Button variants={{ size: 'square' }} data-testid="button" />);
    const button = screen.getByTestId('button');
    expect(button).toHaveClass('aspect-square');
  });

  it('Should render correctly size circle', () => {
    render(<Button variants={{ size: 'circle' }} data-testid="button" />);
    const button = screen.getByTestId('button');
    expect(button).toHaveClass('rounded-full');
  });
});
