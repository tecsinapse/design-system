import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Hint } from '../components/Hint';

test('renders Hint with description', () => {
  const descriptionText = 'This is a hint description';
  render(<Hint description={descriptionText} />);

  const descriptionElement = screen.getByText(descriptionText);

  expect(descriptionElement).toBeInTheDocument();
});

test('renders Hint with children', () => {
  render(
    <Hint>
      <p>Child Element</p>
    </Hint>
  );

  const childElement = screen.getByText('Child Element');

  expect(childElement).toBeInTheDocument();
});
