import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import React from 'react';
import { Menubar } from '../../components';
import { renderWithProvider } from '../Input/utils/renderWithProvider';

describe('Item Menubar', () => {
  it('Should renders children correctly', () => {
    const { getByText } = renderWithProvider(
      <Menubar.Item parentCategoryTitle={'Test Category'} title={'Test Title'}>
        Test Child
      </Menubar.Item>
    );
    expect(getByText('Test Child')).toBeInTheDocument();
  });

  it('Should renders IconControlSubItem when subItems are provided', () => {
    const { getByTestId } = renderWithProvider(
      <Menubar.Item
        parentCategoryTitle={'Test Category'}
        title={'Test Title'}
        subItems={['SubItem 1']}
        renderSubItems={subItem => <div key={subItem}>{subItem}</div>}
      >
        Test Child
      </Menubar.Item>
    );
    expect(getByTestId('icon-sub-item-menubar')).toBeInTheDocument();
  });

  it('Should renders as a link when href is provided', () => {
    const { container } = renderWithProvider(
      <Menubar.Item
        parentCategoryTitle={'Test Category'}
        title={'Test Title'}
        anchorProps={{ href: 'http://example.com' }}
      >
        Test Child
      </Menubar.Item>
    );
    expect(container.querySelector('a')).toHaveAttribute(
      'href',
      'http://example.com'
    );
  });

  it('Should renders correct style for item text', () => {
    renderWithProvider(
      <>
        <Menubar.Item
          parentCategoryTitle={'Test Category'}
          title={'Test Title'}
          anchorProps={{ href: 'http://example.com' }}
        >
          Test Child 1
        </Menubar.Item>
        <Menubar.Item
          parentCategoryTitle={'Test Category 2'}
          title={'Test Title 2'}
          anchorProps={undefined}
          subItems={[{}]}
        >
          Test Child 2
        </Menubar.Item>
      </>
    );

    const menubarItems = screen.getAllByTestId('item-menubar');

    expect(menubarItems[0]).toHaveClass('hover:text-primary-medium');
    expect(menubarItems[1]).not.toHaveClass('hover:text-primary-medium');
  });
});
