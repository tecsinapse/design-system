import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { LiaAngrySolid, LiaEyeSolid } from 'react-icons/lia';
import { Input } from '../../components';

describe('Input.Face', () => {
  it('Should render component with children', () => {
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

  it('Should apply className correctly', () => {
    render(
      <Input.Face variants={{ intent: 'default' }} className="custom-class">
        <div>Child</div>
      </Input.Face>
    );

    const inputFace = screen.getByTestId('input-face');

    expect(inputFace).toHaveClass('custom-class');
  });

  it('Should forward ref to the div element', () => {
    const ref = React.createRef<HTMLDivElement>();

    render(
      <Input.Face ref={ref}>
        <div>Child</div>
      </Input.Face>
    );

    const inputFace = screen.getByTestId('input-face');

    expect(ref.current).toBe(inputFace);
  });
});
