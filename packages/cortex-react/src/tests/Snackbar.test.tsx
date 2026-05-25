import React from 'react';
import '@testing-library/jest-dom';
import { BaseSnackbar } from '../components';
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
    expect(snack).toHaveClass('bg-content-inverse');
    expect(snack).toHaveClass('text-content-low');
  });
});
