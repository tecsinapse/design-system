import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Loading } from '../components';

describe('Loading Component', () => {
  it('Should render the loading spinner', () => {
    const { getByRole } = render(<Loading />);

    const statusElement = getByRole('status');
    expect(statusElement).toBeInTheDocument();

    const svgElement = statusElement.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
  });

  it('Should apply custom className', () => {
    const customClass = 'custom-class';
    const { getByRole } = render(<Loading className={customClass} />);

    const svgElement = getByRole('status').querySelector('svg');
    expect(svgElement).toHaveClass(customClass);
  });
});
