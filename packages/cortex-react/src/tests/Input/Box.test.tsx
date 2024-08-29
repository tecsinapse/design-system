import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { Input } from '../../components';

describe('Input.Box', () => {
  it('Should render component', () => {
    render(<Input.Box label="Name" />);

    const inputElement = screen.getByText('Name');

    expect(inputElement).toBeInTheDocument();
  });

  it('Should update value on change', () => {
    render(<Input.Box label="Name" data-testid="input-box" />);

    const inputElement = screen.getByTestId('input-box') as HTMLInputElement;

    fireEvent.change(inputElement, { target: { value: 'Robert Martin' } });

    expect(inputElement.value).toBe('Robert Martin');
  });

  it('Should handle focus and blur events', () => {
    const handleFocus = jest.fn();
    const handleBlur = jest.fn();

    render(
      <Input.Box
        label="Name"
        onFocus={handleFocus}
        onBlur={handleBlur}
        data-testid="input-box"
      />
    );
    const inputElement = screen.getByTestId('input-box') as HTMLInputElement;

    fireEvent.focus(inputElement);
    expect(handleFocus).toHaveBeenCalledTimes(1);

    fireEvent.blur(inputElement);
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  it('Should render placeholder when input is empty', () => {
    render(<Input.Box label="Name" placeholder="Placeholder" />);

    const labelElement = screen.getByTestId('input-label');

    expect(labelElement).toHaveClass('peer-placeholder-shown:hidden');
  });

  it('Should hide placeholder when input is not empty', () => {
    const placeholder = 'Placeholder';
    render(
      <Input.Box
        label="Name"
        placeholder={placeholder}
        defaultValue={'Input not empty'}
      />
    );

    const labelElement = screen.getByText('Name');

    expect(labelElement).toBeInTheDocument();
    expect(screen.queryByText(placeholder)).toBeNull();
  });

  it('Should forward ref correctly', () => {
    const ref = React.createRef<HTMLInputElement>();

    render(
      <Input.Box
        name="test"
        label="Test Label"
        ref={ref}
        data-testid="input-box"
      />
    );

    const inputElement = screen.getByTestId('input-box');

    expect(ref.current).toBe(inputElement);
  });
});
