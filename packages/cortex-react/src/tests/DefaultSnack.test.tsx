import { render, screen } from '@testing-library/react';
import { DefaultSnack } from '../components';
import React from 'react';
import '@testing-library/jest-dom';

describe('DefaultSnack', () => {
  it('Should render DefaultSnack', () => {
    const textSnack = 'Text example';
    render(<DefaultSnack text={textSnack} onDismiss={jest.fn} />);
    const snack = screen.getByTestId('snackbar');
    const iconInfo = screen.getByTestId('icon-info');
    const iconClose = screen.getByTestId('icon-close');

    expect(snack).toBeInTheDocument();
    expect(iconInfo).toBeInTheDocument();
    expect(iconClose).toBeInTheDocument();
  });
  it('Should render correctly text', () => {
    const textSnack = 'Text example';
    render(<DefaultSnack text={textSnack} onDismiss={jest.fn} />);
    const snack = screen.getByTestId('snackbar');

    expect(snack).toHaveTextContent(textSnack);
  });
});
