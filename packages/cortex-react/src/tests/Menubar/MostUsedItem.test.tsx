import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';
import { Menubar } from '../../components';

describe('MostUsedItem Menubar', () => {
  it('Should render correctly', () => {
    const { getByTestId } = render(
      <Menubar.MostUsedItem title="Test Title" category="Test Category" />
    );
    expect(getByTestId('most-used-item-menubar')).toBeInTheDocument();
  });

  it('Should renders title and category correctly', () => {
    const { getByText } = render(
      <Menubar.MostUsedItem title="Test Title" category="Test Category" />
    );
    expect(getByText('Test Title')).toBeInTheDocument();
    expect(getByText('Test Category')).toBeInTheDocument();
  });

  it('renders an anchor tag when href is provided', () => {
    const { container } = render(
      <Menubar.MostUsedItem
        title="Test Title"
        category="Test Category"
        anchorProps={{ href: 'http://example.com' }}
      />
    );
    expect(container.querySelector('a')).toHaveAttribute(
      'href',
      'http://example.com'
    );
  });

  it('does not render an anchor tag when href is not provided', () => {
    const { container } = render(
      <Menubar.MostUsedItem title="Test Title" category="Test Category" />
    );
    expect(container.firstChild).not.toHaveProperty('tagName', 'A');
  });
});
