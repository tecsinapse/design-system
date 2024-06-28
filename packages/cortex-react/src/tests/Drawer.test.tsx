import '@testing-library/jest-dom';
import React from 'react';
import { Drawer } from '../components';
import { fireEvent, render, screen } from '@testing-library/react';

describe('Drawer', () => {
  it('Should render drawer closed by default', () => {
    render(<Drawer open={false} onClose={jest.fn} />);
    const drawer = screen.getByTestId('drawer');
    const overlay = screen.getByTestId('overlay');

    expect(drawer).toHaveClass('invisible');
    expect(overlay).toHaveClass('invisible');
  });

  it('Should render drawer open', () => {
    render(<Drawer open onClose={jest.fn} />);
    const drawer = screen.getByTestId('drawer');
    const overlay = screen.getByTestId('overlay');
    expect(drawer).not.toHaveClass('invisible');
    expect(overlay).not.toHaveClass('invisible');
  });

  it('Should call onClose when overlay is clicked', () => {
    const onClose = jest.fn();
    render(<Drawer open={true} onClose={onClose} />);
    const overlay = screen.getByTestId('overlay');
    fireEvent.click(overlay);
    expect(onClose).toHaveBeenCalled();
  });

  it('Should apply correct position left class', () => {
    render(<Drawer open={true} onClose={jest.fn()} position={'left'} />);
    const drawer = screen.getByTestId('drawer');
    expect(drawer).toHaveClass('left-0');
  });

  it('Should apply correct position right class', () => {
    render(<Drawer open={true} onClose={jest.fn()} position={'right'} />);
    const drawer = screen.getByTestId('drawer');
    expect(drawer).toHaveClass('right-1');
  });

  it('Should render children correctly', () => {
    render(
      <Drawer open={true} onClose={jest.fn()}>
        <h1>Title Drawer</h1>
      </Drawer>
    );
    const drawer = screen.getByTestId('drawer');
    expect(drawer).toHaveTextContent('Title Drawer');
  });
});
