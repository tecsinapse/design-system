import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Card } from '../components';

describe('Card', () => {
  it('renders component with children', () => {
    render(
      <Card>
        <p>Card test</p>
      </Card>
    );

    const cardElement = screen.getByText('Card test');

    expect(cardElement).toBeInTheDocument();
  });

  it('does not apply the selected border color when not selectable', () => {
    render(
      <Card isSelected data-testid="card">
        Card test
      </Card>
    );

    expect(screen.getByTestId('card')).not.toHaveClass('border-primary-medium');
  });

  it('does not apply the selected border color when selectable but not selected', () => {
    render(
      <Card selectable data-testid="card">
        Card test
      </Card>
    );

    expect(screen.getByTestId('card')).not.toHaveClass('border-primary-medium');
  });

  it('applies the selected border color only when selectable and isSelected', () => {
    render(
      <Card selectable isSelected data-testid="card">
        Card test
      </Card>
    );

    expect(screen.getByTestId('card')).toHaveClass('border-primary-medium');
  });
});
