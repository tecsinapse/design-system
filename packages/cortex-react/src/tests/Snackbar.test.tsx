import React from 'react';
import '@testing-library/jest-dom';
import { BaseSnackbar, DefaultSnack } from '../components';
import { render, screen } from '@testing-library/react';

describe('BaseSnackBar', () => {
  it('Should render Snack', () => {
    render(
      <BaseSnackbar show={true} variants={{ intent: 'default' }}>
        <p>Description snackbar</p>
      </BaseSnackbar>
    );
    const snack = screen.getByTestId('snackbar');
    expect(snack).toBeInTheDocument();
  });

  it('Should not render Snack', () => {
    render(
      <BaseSnackbar show={false} variants={{ intent: 'default' }}>
        <p>Description snackbar</p>
      </BaseSnackbar>
    );
    const snack = screen.queryByTestId('snackbar');
    expect(snack).not.toBeInTheDocument();
  });

  it('Should render Snack Default', () => {
    render(
      <BaseSnackbar show={true} variants={{ intent: 'default' }}>
        <p>Description snackbar</p>
      </BaseSnackbar>
    );
    const snack = screen.getByTestId('snackbar');
    expect(snack).toHaveClass('bg-primary-xlight');
    expect(snack).toHaveClass('text-primary-medium');
  });

  it('Should render Snack Success', () => {
    render(
      <BaseSnackbar show={true} variants={{ intent: 'success' }}>
        <p>Description snackbar</p>
      </BaseSnackbar>
    );
    const snack = screen.getByTestId('snackbar');
    expect(snack).toHaveClass('bg-success-xlight');
    expect(snack).toHaveClass('text-success-medium');
  });

  it('Should render Snack Error', () => {
    render(
      <BaseSnackbar show={true} variants={{ intent: 'error' }}>
        <p>Description snackbar</p>
      </BaseSnackbar>
    );
    const snack = screen.getByTestId('snackbar');
    expect(snack).toHaveClass('bg-error-xlight');
    expect(snack).toHaveClass('text-error-medium');
  });

  it('Should render Snack Info', () => {
    render(
      <BaseSnackbar show={true} variants={{ intent: 'info' }}>
        <p>Description snackbar</p>
      </BaseSnackbar>
    );
    const snack = screen.getByTestId('snackbar');
    expect(snack).toHaveClass('bg-info-xlight');
    expect(snack).toHaveClass('text-info-medium');
  });

  it('Should render Snack Warning', () => {
    render(
      <BaseSnackbar show={true} variants={{ intent: 'warning' }}>
        <p>Description snackbar</p>
      </BaseSnackbar>
    );
    const snack = screen.getByTestId('snackbar');
    expect(snack).toHaveClass('bg-warning-xlight');
    expect(snack).toHaveClass('text-warning-medium');
  });

  it('Should render Snack Secondary', () => {
    render(
      <BaseSnackbar show={true} variants={{ intent: 'secondary' }}>
        <p>Description snackbar</p>
      </BaseSnackbar>
    );
    const snack = screen.getByTestId('snackbar');
    expect(snack).toHaveClass('bg-secondary-xlight');
    expect(snack).toHaveClass('text-secondary-medium');
  });
});

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
