import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Card } from '../components/Card';

test('renders Card with children', () => {
  render(
    <Card>
      <p>Card test</p>
    </Card>
  );

  const cardElement = screen.getByText('Card test');

  expect(cardElement).toBeInTheDocument();
});
