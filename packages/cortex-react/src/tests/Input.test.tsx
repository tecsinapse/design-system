import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { LiaAngrySolid, LiaEyeSolid } from 'react-icons/lia';
import { Input } from '../components/Input';

test('renders Input component', () => {
  render(<Input.Root label="Name" />);

  const inputElement = screen.getByText('Name');

  expect(inputElement).toBeInTheDocument();
});

test('updates value on change', () => {
  render(<Input.Root label="Name" />);

  const inputElement = screen.getByTestId('input-input') as HTMLInputElement;

  fireEvent.change(inputElement, { target: { value: 'Robert Martin' } });

  expect(inputElement.value).toBe('Robert Martin');
});

test('handles focus and blur events', () => {
  const handleFocus = jest.fn();
  const handleBlur = jest.fn();

  render(<Input.Root label="Name" onFocus={handleFocus} onBlur={handleBlur} />);
  const inputElement = screen.getByTestId('input-input') as HTMLInputElement;

  fireEvent.focus(inputElement);
  expect(handleFocus).toHaveBeenCalledTimes(1);

  fireEvent.blur(inputElement);
  expect(handleBlur).toHaveBeenCalledTimes(1);
});

test('renders left and right components', () => {
  render(
    <Input.Face>
      <Input.Left>
        <LiaAngrySolid data-testid="input-left-icon" />
      </Input.Left>
      <Input.Box label="Name"></Input.Box>
      <Input.Right>
        <LiaEyeSolid data-testid="input-right-icon" />
      </Input.Right>
    </Input.Face>
  );

  const leftIconElement = screen.getByTestId('input-left-icon');
  const rightIconElement = screen.getByTestId('input-right-icon');

  expect(leftIconElement).toBeInTheDocument();
  expect(rightIconElement).toBeInTheDocument();
});

test('renders placeholder when input is empty', () => {
  render(<Input.Root label="Name" placeholder="Placeholder" />);

  const labelElement = screen.getByTestId('input-label');

  expect(labelElement).toHaveClass('peer-placeholder-shown:hidden');
});

test('hides placeholder when input is not empty', () => {
  const placeholder = 'Placeholder';
  render(
    <Input.Root
      label="Name"
      placeholder={placeholder}
      defaultValue={'Input not empty'}
    />
  );

  const labelElement = screen.getByText('Name');

  expect(labelElement).toBeInTheDocument();
  expect(screen.queryByText(placeholder)).toBeNull();
});
