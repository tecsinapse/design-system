import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Input } from '../../components';

describe('Input.Root', () => {
  it('Should render component', () => {
    render(<Input.Root label="Name" />);

    const inputElement = screen.getByText('Name');

    expect(inputElement).toBeInTheDocument();
  });

  it('Should render Input.Root with Input.Face and Input.Box', () => {
    render(
      <Input.Root
        variants={{ intent: 'default' }}
        className="custom-class"
        data-testid="input-box"
      />
    );

    const inputFace = screen.getByTestId('input-face');
    const inputBox = screen.getByTestId('input-box');

    expect(inputFace).toBeInTheDocument();
    expect(inputBox).toBeInTheDocument();
  });

  it('Should apply variants and className to Input.Face', () => {
    render(
      <Input.Root variants={{ intent: 'default' }} className="custom-class" />
    );

    const inputFace = screen.getByTestId('input-face');

    expect(inputFace).toHaveClass('custom-class');
  });

  it('Should forward ref to Input.Box', () => {
    const ref = React.createRef<HTMLInputElement>();

    render(<Input.Root ref={ref} data-testid="input-box" />);

    const inputBox = screen.getByTestId('input-box');

    expect(ref.current).toBe(inputBox);
  });

  it('Should pass props to InputBox', () => {
    render(
      <Input.Root
        name="test"
        placeholder="Enter text"
        data-testid="input-box"
      />
    );

    const inputBox = screen.getByTestId('input-box');

    expect(inputBox).toHaveAttribute('name', 'test');
    expect(inputBox).toHaveAttribute('placeholder', 'Enter text');
  });
});
