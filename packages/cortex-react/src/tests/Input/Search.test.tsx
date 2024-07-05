import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { Input, InputSearchProps } from '../../components';

describe('Input.Search', () => {
  let mockOnChange = jest.fn();

  const setup = (props: Partial<InputSearchProps> = {}) => {
    const defaultProps: InputSearchProps = {
      onChange: mockOnChange,
      bounceTimeout: 1000,
      variants: {},
      className: 'input-search',
      ...props,
    };

    return render(<Input.Search {...defaultProps} />);
  };

  beforeEach(() => {
    mockOnChange = jest.fn();
  });

  it('Should render Input.Search with all elements', () => {
    setup();

    expect(screen.getByTestId('icon-search-left')).toBeInTheDocument();
    expect(screen.getByTestId('input-box')).toBeInTheDocument();
  });

  it('Should call onChange respecting the bounceTimeout prop', async () => {
    setup({ bounceTimeout: 2000 });

    const input = screen.getByTestId('input-box');

    fireEvent.change(input, { target: { value: 'debounce test' } });

    await waitFor(() => expect(mockOnChange).not.toHaveBeenCalled());

    await waitFor(
      () => {
        expect(mockOnChange).toHaveBeenCalledTimes(1);
      },
      { timeout: 2500 }
    );
  });

  it('Should show search icon on Input.Search', () => {
    setup();

    const iconElement = screen.getByTestId('icon-search-left');

    expect(iconElement).toBeInTheDocument();
  });
});
