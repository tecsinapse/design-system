import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React, { ElementType } from 'react';
import { BreadcrumbType, Breadcrumbs } from '../components';

const breadcrumbs: BreadcrumbType[] = [
  { title: 'Home', Component: 'a' as ElementType },
  { title: 'Category', Component: 'a' as ElementType },
  { title: 'Product', Component: 'a' as ElementType },
];

describe('Breadcrumbs', () => {
  it('renders component with all breadcrumb items', () => {
    render(<Breadcrumbs breadcrumbs={breadcrumbs} />);
    breadcrumbs.forEach(breadcrumb => {
      const breadcrumbItem = screen.getByText(breadcrumb.title);
      expect(breadcrumbItem).toBeInTheDocument();
    });
  });

  it('number of arrow icons should be breadcrumbs length - 1', () => {
    render(<Breadcrumbs breadcrumbs={breadcrumbs} />);
    const iconElements = screen.queryAllByTestId('breadcrumb-item-icon');
    expect(iconElements.length).toBe(breadcrumbs.length - 1);
  });

  it('passes isLast prop correctly to each breadcrumb', () => {
    render(<Breadcrumbs breadcrumbs={breadcrumbs} />);

    breadcrumbs.map((item, index) => {
      const lastTitleElement = screen.getByText(item.title);
      expect(lastTitleElement).toHaveClass(
        index === breadcrumbs.length - 1
          ? 'text-content-low'
          : 'text-content-medium'
      );
    });
  });
});
