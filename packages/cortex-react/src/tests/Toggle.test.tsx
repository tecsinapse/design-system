import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { Toggle } from '../components/Toggle';

test('renders Toggle and verify if is checked after click', () => {
  render(<Toggle />);

  const toggleDivElement = screen.getByTestId('toggle-div');
  const toggleInputElement = screen.getByTestId('toggle-input');

  fireEvent.click(toggleInputElement);

  expect(toggleDivElement).toBeInTheDocument();
  expect(toggleInputElement).toBeChecked();
});
