import '@testing-library/jest-dom';
import React from 'react';
import { Modal } from '../components';
import { fireEvent, render, screen } from '@testing-library/react';

describe('Modal', () => {
  it('Should render modal closed by default', () => {
    render(<Modal open={false} onClose={jest.fn} />);
    const modal = screen.getByTestId('modal');
    const overlay = screen.getByTestId('overlay');

    expect(modal).toHaveClass('invisible');
    expect(overlay).toHaveClass('invisible');
  });

  it('Should render modal open', () => {
    render(<Modal open onClose={jest.fn} />);
    const modal = screen.getByTestId('modal');
    const overlay = screen.getByTestId('overlay');
    expect(modal).not.toHaveClass('invisible');
    expect(overlay).not.toHaveClass('invisible');
  });

  it('Should call onClose when overlay is clicked', () => {
    const onClose = jest.fn();
    render(<Modal open={true} onClose={onClose} />);
    const overlay = screen.getByTestId('overlay');
    fireEvent.click(overlay);
    expect(onClose).toHaveBeenCalled();
  });

  it('Should render children correctly', () => {
    render(
      <Modal open={true} onClose={jest.fn()}>
        <h1>Title Modal</h1>
      </Modal>
    );
    const modal = screen.getByTestId('modal');
    expect(modal).toHaveTextContent('Title Modal');
  });
});
