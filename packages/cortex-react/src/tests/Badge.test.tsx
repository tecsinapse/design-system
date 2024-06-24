import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Badge, BadgeAnchor } from '../components/Badge';
import { Button } from '../components/Button';

test('renders Badge with value', () => {
  const value = 5;
  render(<Badge value={value} />);

  const badgeElement = screen.getByText(value);

  expect(badgeElement).toBeInTheDocument();
});

test('renders BadgeAnchor with children and value', () => {
  const value = 5;
  render(
    <BadgeAnchor value={value}>
      <Button>
        <p>Button</p>
      </Button>
    </BadgeAnchor>
  );

  const childElement = screen.getByText('Button');
  const badgeElement = screen.getByText(value);

  expect(childElement).toBeInTheDocument();
  expect(badgeElement).toBeInTheDocument();
});
