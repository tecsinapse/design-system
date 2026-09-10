import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Chip } from '../components';

describe('Chip', () => {
  it('renders component with children', () => {
    render(<Chip>My Chip</Chip>);

    expect(screen.getByText('My Chip')).toBeInTheDocument();
  });

  it('renders as a button so it is keyboard focusable', () => {
    render(<Chip>My Chip</Chip>);

    expect(screen.getByRole('button', { name: 'My Chip' })).toBeInTheDocument();
  });

  it('reflects isSelected via aria-pressed', () => {
    const { rerender } = render(<Chip isSelected={false}>My Chip</Chip>);

    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'false');

    rerender(<Chip isSelected>My Chip</Chip>);

    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<Chip onSelect={onSelect}>My Chip</Chip>);

    fireEvent.click(screen.getByRole('button'));

    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it('is keyboard-activatable with Enter and Space via native button semantics', async () => {
    const onSelect = vi.fn();
    const user = userEvent.setup();
    render(<Chip onSelect={onSelect}>My Chip</Chip>);

    await user.tab();
    expect(screen.getByRole('button')).toHaveFocus();

    await user.keyboard('{Enter}');
    expect(onSelect).toHaveBeenCalledTimes(1);

    await user.keyboard(' ');
    expect(onSelect).toHaveBeenCalledTimes(2);
  });

  it('forwards className and native button attributes', () => {
    render(
      <Chip className="custom-class" data-testid="chip">
        My Chip
      </Chip>
    );

    const chip = screen.getByTestId('chip');
    expect(chip).toHaveClass('custom-class');
  });

  it('forwards ref to the underlying button element', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Chip ref={ref}>My Chip</Chip>);

    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
