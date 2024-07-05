import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Input } from '../../components';

describe('Input.Left', () => {
  it('Should render Input.Left with default class', () => {
    render(
      <Input.Left>
        <span>Test Child</span>
      </Input.Left>
    );

    const divElement = screen.getByText('Test Child').parentElement;

    expect(divElement).toBeInTheDocument();
    expect(divElement).toHaveClass('mr-2.5');
  });

  it('Should render children correctly', () => {
    render(
      <Input.Left>
        <span>Test Child</span>
      </Input.Left>
    );

    const childElement = screen.getByText('Test Child');

    expect(childElement).toBeInTheDocument();
  });

  it('Should apply additional class name', () => {
    render(
      <Input.Left className="additional-class">
        <span>Test Child</span>
      </Input.Left>
    );

    const divElement = screen.getByText('Test Child').parentElement;

    expect(divElement).toHaveClass('mr-2.5');
    expect(divElement).toHaveClass('additional-class');
  });

  it('Should forward ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();

    render(
      <Input.Left ref={ref}>
        <span>Test Child</span>
      </Input.Left>
    );

    const divElement = screen.getByText('Test Child').parentElement;

    expect(ref.current).toBe(divElement);
  });
});
