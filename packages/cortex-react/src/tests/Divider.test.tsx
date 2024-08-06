import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';
import { Divider } from '../components';

describe('Divider', () => {
  it('should render', () => {
    const { getByRole } = render(<Divider />);
    expect(getByRole('separator')).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    const customClass = 'custom-class';

    const { getByRole } = render(<Divider className={customClass} />);
    const hrElement = getByRole('separator');

    expect(hrElement).toHaveClass(customClass);
  });

  it('should pass other HTML attributes', () => {
    const { getByRole } = render(
      <Divider id="test-id" data-testid="divider" />
    );
    const hrElement = getByRole('separator');

    expect(hrElement).toHaveAttribute('id', 'test-id');
    expect(hrElement).toHaveAttribute('data-testid', 'divider');
  });
});
