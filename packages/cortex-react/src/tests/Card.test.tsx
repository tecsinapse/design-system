import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
      <Card variants={{ isSelected: true }} data-testid="card">
        Card test
      </Card>
    );

    expect(screen.getByTestId('card')).not.toHaveClass('border-primary-medium');
  });

  it('does not apply the selected border color when selectable but not selected', () => {
    render(
      <Card variants={{ selectable: true }} data-testid="card">
        Card test
      </Card>
    );

    expect(screen.getByTestId('card')).not.toHaveClass('border-primary-medium');
  });

  it('applies the selected border color only when selectable and isSelected', () => {
    render(
      <Card variants={{ selectable: true, isSelected: true }} data-testid="card">
        Card test
      </Card>
    );

    expect(screen.getByTestId('card')).toHaveClass('border-primary-medium');
  });

  it('is not focusable or exposed as a button when not selectable', () => {
    render(<Card data-testid="card">Card test</Card>);

    const cardElement = screen.getByTestId('card');
    expect(cardElement).not.toHaveAttribute('role');
    expect(cardElement).not.toHaveAttribute('tabindex');
  });

  it('exposes button semantics and aria-pressed when selectable', () => {
    render(
      <Card variants={{ selectable: true, isSelected: true }} data-testid="card">
        Card test
      </Card>
    );

    const cardElement = screen.getByRole('button');
    expect(cardElement).toHaveAttribute('tabindex', '0');
    expect(cardElement).toHaveAttribute('aria-pressed', 'true');
  });

  it('is keyboard-activatable with Enter and Space when selectable', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(
      <Card variants={{ selectable: true }} onClick={onClick}>
        Card test
      </Card>
    );

    await user.tab();
    expect(screen.getByRole('button')).toHaveFocus();

    await user.keyboard('{Enter}');
    expect(onClick).toHaveBeenCalledTimes(1);

    await user.keyboard(' ');
    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it('does not trigger onClick on Enter/Space when not selectable', () => {
    const onClick = vi.fn();
    render(
      <Card data-testid="card" onClick={onClick}>
        Card test
      </Card>
    );

    fireEvent.keyDown(screen.getByTestId('card'), { key: 'Enter' });

    expect(onClick).not.toHaveBeenCalled();
  });
});
