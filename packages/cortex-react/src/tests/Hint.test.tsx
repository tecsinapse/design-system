import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Hint } from '../components/Hint';

describe('Hint', () => {
  it('renders component with description', () => {
    const descriptionText = 'This is a hint description';
    render(<Hint description={descriptionText} />);

    const descriptionElement = screen.getByText(descriptionText);

    expect(descriptionElement).toBeInTheDocument();
  });

  it('renders component with children', () => {
    render(
      <Hint>
        <p>Child Element</p>
      </Hint>
    );

    const childElement = screen.getByText('Child Element');

    expect(childElement).toBeInTheDocument();
  });
});
