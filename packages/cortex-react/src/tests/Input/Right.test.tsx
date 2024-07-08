import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Input } from '../../components';

describe('Input.Right', () => {
  it('Should render Input.Right with default class', () => {
    render(
      <Input.Right>
        <span>Test Child</span>
      </Input.Right>
    );

    const divElement = screen.getByText('Test Child').parentElement;

    expect(divElement).toBeInTheDocument();
    expect(divElement).toHaveClass('ml-2.5');
  });

  it('Should render children correctly', () => {
    render(
      <Input.Right>
        <span>Test Child</span>
      </Input.Right>
    );

    const childElement = screen.getByText('Test Child');

    expect(childElement).toBeInTheDocument();
  });

  it('Should apply additional class name', () => {
    render(
      <Input.Right className="additional-class">
        <span>Test Child</span>
      </Input.Right>
    );

    const divElement = screen.getByText('Test Child').parentElement;

    expect(divElement).toHaveClass('ml-2.5');
    expect(divElement).toHaveClass('additional-class');
  });

  it('Should forward ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();

    render(
      <Input.Right ref={ref}>
        <span>Test Child</span>
      </Input.Right>
    );

    const divElement = screen.getByText('Test Child').parentElement;

    expect(ref.current).toBe(divElement);
  });
});
