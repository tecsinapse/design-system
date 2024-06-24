import '@testing-library/jest-dom';
import { act, render, screen } from '@testing-library/react';
import React from 'react';
import { ProgressBar } from '../components';

describe('ProgressBar', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => jest.useRealTimers());

  it('Render ProgressBar', () => {
    const { getByTestId } = render(<ProgressBar valueCurrent={50} />);
    const progressBar = getByTestId('progress-bar');
    expect(progressBar).toBeInTheDocument();
  });

  it('Render ProgressBar 0% filled', () => {
    render(<ProgressBar valueCurrent={0} />);

    act(() => {
      jest.advanceTimersByTime(0); // Avança o tempo para permitir que o useEffect seja executado
    });

    const filledSegments = screen.getAllByTestId('div-segment-filled');
    filledSegments.forEach(segment => {
      expect(segment).toHaveStyle('width: 0%');
    });
  });

  it('Render ProgressBar 50% filled', () => {
    render(<ProgressBar valueCurrent={50} />);

    act(() => {
      jest.advanceTimersByTime(0); // Avança o tempo para permitir que o useEffect seja executado
    });

    const filledSegments = screen.getAllByTestId('div-segment-filled');
    filledSegments.forEach(segment => {
      expect(segment).toHaveStyle('width: 50%');
    });
  });

  it('Renders progressBar with 100% filled', () => {
    render(<ProgressBar valueCurrent={100} />);

    act(() => {
      jest.advanceTimersByTime(0); // Avança o tempo para permitir que o useEffect seja executado
    });
    const filledSegments = screen.getAllByTestId('div-segment-filled');
    filledSegments.forEach(segment => {
      expect(segment).toHaveStyle('width: 100%');
    });
  });

  it('ProgressBar must handle values outside the range (More than 100%)', () => {
    render(<ProgressBar valueCurrent={150} />);

    act(() => {
      jest.advanceTimersByTime(0); // Avança o tempo para permitir que o useEffect seja executado
    });
    const filledSegments = screen.getAllByTestId('div-segment-filled');
    filledSegments.forEach(segment => {
      expect(segment).toHaveStyle('width: 100%');
    });
  });

  it('ProgressBar must handle values outside the range (Less than 0%)', () => {
    render(<ProgressBar valueCurrent={-50} />);

    act(() => {
      jest.advanceTimersByTime(0); // Avança o tempo para permitir que o useEffect seja executado
    });
    const filledSegments = screen.getAllByTestId('div-segment-filled');
    filledSegments.forEach(segment => {
      expect(segment).toHaveStyle('width: 0%');
    });
  });

  it('Progress bar show segments correctly', () => {
    render(<ProgressBar valueCurrent={50} segments={5} />);
    const filledSegments = screen.getAllByTestId('div-segment-filled');
    expect(filledSegments.length).toBe(5);
  });

  it('Should apply correct collor based in prop intentProgress', () => {
    const { getByTestId } = render(
      <ProgressBar valueCurrent={50} intentProgress="success" />
    );
    const progressBar = getByTestId('div-segment-filled');
    expect(progressBar).toHaveClass('bg-success-medium');
  });

  it('Should respect values min and max', () => {
    const { getByTestId } = render(
      <ProgressBar valueCurrent={75} valueMin={50} valueMax={100} />
    );
    act(() => {
      jest.advanceTimersByTime(0);
    });
    const progressBar = getByTestId('div-segment-filled');
    expect(progressBar.style.width).toBe('50%');
  });
});
