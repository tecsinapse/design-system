import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Hint } from '../components';

describe('Hint', () => {
  it('Should renders component with string', () => {
    const descriptionText = 'This is a hint description';
    render(<Hint>{descriptionText}</Hint>);

    const descriptionElement = screen.getByText(descriptionText);

    expect(descriptionElement).toBeInTheDocument();
  });

  it('Should render component with children', () => {
    render(
      <Hint>
        <p>Child Element</p>
      </Hint>
    );

    const childElement = screen.getByText('Child Element');

    expect(childElement).toBeInTheDocument();
  });
});
