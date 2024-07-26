import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { RadioButton } from '../components';

describe('RadioButton', () => {
  it('Should render base RadioButton', () => {
    render(<RadioButton id="radio" />);

    const radioButtonElement = screen.getByRole('radio');
    const labelElement = screen.queryByRole('label');

    expect(radioButtonElement).toBeInTheDocument();
    expect(labelElement).not.toBeInTheDocument();
  });

  it('Should render RadioButton with label', () => {
    render(<RadioButton id="radio" label="Option" />);

    const radioButton = screen.getByLabelText('Option');
    expect(radioButton).toBeInTheDocument();
  });

  it('Should change state when label is clicked', () => {
    render(<RadioButton id="radio" label="Option" />);

    const radioButtonElement = screen.getByRole('radio') as HTMLInputElement;
    const labelElement = screen.getByLabelText('Option');
    expect(radioButtonElement.checked).toBe(false);

    fireEvent.click(labelElement);
    expect(radioButtonElement.checked).toBe(true);
  });

  it('Should change state when radio is clicked', () => {
    render(<RadioButton id="radio" label="Option" />);

    const radioButton = screen.getByRole('radio') as HTMLInputElement;
    expect(radioButton.checked).toBe(false);

    fireEvent.click(radioButton);
    expect(radioButton.checked).toBe(true);
  });

  it('Should apply reversed class when reversed prop is true', () => {
    render(<RadioButton id="radio" label="Option" reversed />);

    const radioButtonContainerElement = screen.getByTestId(
      'radio-button-container'
    ) as HTMLDivElement;

    expect(radioButtonContainerElement).toHaveClass('flex-row-reverse');
  });
});
