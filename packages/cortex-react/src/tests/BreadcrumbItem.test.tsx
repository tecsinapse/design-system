import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React, { ElementType } from 'react';
import { BreadcrumbItem, BreadcrumbType } from '../components';

const breadcrumbProps: BreadcrumbType = {
  Component: 'a' as ElementType,
  componentProps: {},
  title: 'Home',
};

describe('BreadcrumbItem', () => {
  it('renders component with title', () => {
    render(<BreadcrumbItem {...breadcrumbProps} isLast={false} />);

    const breadcrumbItemElement = screen.getByText('Home');

    expect(breadcrumbItemElement).toBeInTheDocument();
  });

  it('applies correct className based on isLast prop', () => {
    const { rerender } = render(
      <BreadcrumbItem {...breadcrumbProps} isLast={true} />
    );

    const breadcrumbItemElement = screen.getByText('Home');

    expect(breadcrumbItemElement).toHaveClass('text-content-low');

    rerender(<BreadcrumbItem {...breadcrumbProps} isLast={false} />);

    expect(breadcrumbItemElement).toHaveClass('text-content-medium');
  });

  it('renders icon when isLast is false', () => {
    render(<BreadcrumbItem {...breadcrumbProps} isLast={false} />);

    const iconElement = screen.getByTestId('breadcrumb-item-icon');

    expect(iconElement).toBeInTheDocument();
  });

  it('does not render icon when isLast is true', () => {
    render(<BreadcrumbItem {...breadcrumbProps} isLast={true} />);

    const iconElement = screen.queryByTestId('breadcrumb-item-icon');

    expect(iconElement).toBeNull();
  });

  it('renders Component with correct props', () => {
    const componentProps = {
      'data-testid': 'component',
      href: 'https://www.google.com/',
    };
    render(
      <BreadcrumbItem
        {...breadcrumbProps}
        componentProps={componentProps}
        isLast={false}
      />
    );
    const componentElement = screen.getByTestId('component');

    expect(componentElement).toBeInTheDocument();
    expect(componentElement).toHaveAttribute('href', 'https://www.google.com/');
  });
});
