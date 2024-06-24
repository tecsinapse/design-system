import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { Toggle } from '../components/Toggle';

describe('Toggle', () => {
  it('renders component', () => {
    render(<Toggle />);

    const toggleDivElement = screen.getByTestId('toggle-div');

    expect(toggleDivElement).toBeInTheDocument();
  });

  it('is checked after click', () => {
    render(<Toggle />);
    const toggleInputElement = screen.getByTestId('toggle-input');

    fireEvent.click(toggleInputElement);

    expect(toggleInputElement).toBeChecked();
  });
});
