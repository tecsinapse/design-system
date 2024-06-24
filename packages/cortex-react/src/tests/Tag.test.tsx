import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Tag } from '../components/Tag';

test('renders Tag', () => {
  render(<Tag label="tag label" />);

  const tagElement = screen.getByText('tag label');

  expect(tagElement).toBeInTheDocument();
});
