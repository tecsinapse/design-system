import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ProgressBar } from '../components';

describe('ProgressBar', () => {
  it('renders the ProgressBar with default props', () => {
    render(<ProgressBar />);
    const progressElement = screen.getByTestId('linear-progress');
    const filledProgress = screen.getByTestId('progress-filled');

    expect(progressElement).toBeInTheDocument();
    expect(filledProgress).toHaveStyle({ width: '50%' });
    expect(filledProgress).toHaveClass('bg-primary-medium');
  });

  it('renders the ProgressBar with a custom value', () => {
    render(<ProgressBar value={75} />);
    const filledProgress = screen.getByTestId('progress-filled');

    expect(filledProgress).toHaveStyle({ width: '75%' });
  });

  it('renders the ProgressBar with infinite prop', () => {
    render(<ProgressBar infinite />);
    const filledProgress = screen.getByTestId('progress-filled');

    expect(filledProgress).not.toHaveStyle('width: 50%');
    expect(filledProgress).toHaveClass('animate-progress');
  });

  it('applies the correct intent class', () => {
    const { rerender } = render(<ProgressBar intent="success" />);
    const filledProgress = screen.getByTestId('progress-filled');

    expect(filledProgress).toHaveClass('bg-success-medium');

    rerender(<ProgressBar intent="warning" />);
    expect(filledProgress).toHaveClass('bg-warning-medium');

    rerender(<ProgressBar intent="error" />);
    expect(filledProgress).toHaveClass('bg-error-medium');
  });
});
