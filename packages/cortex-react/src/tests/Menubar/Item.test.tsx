import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Menubar } from '../../components';

describe('Item Menubar', () => {
  it('Should renders children correctly', () => {
    const { getByText } = render(<Menubar.Item>Test Child</Menubar.Item>);
    expect(getByText('Test Child')).toBeInTheDocument();
  });

  it('Should renders IconControlSubItem when subItems are provided', () => {
    const { getByTestId } = render(
      <Menubar.Item
        subItems={['SubItem 1']}
        renderSubItems={subItem => <div key={subItem}>{subItem}</div>}
      >
        Test Child
      </Menubar.Item>
    );
    expect(getByTestId('icon-sub-item-menubar')).toBeInTheDocument();
  });

  it('Should renders as a link when href is provided', () => {
    const { container } = render(
      <Menubar.Item anchorProps={{ href: 'http://example.com' }}>
        Test Child
      </Menubar.Item>
    );
    expect(container.querySelector('a')).toHaveAttribute(
      'href',
      'http://example.com'
    );
  });

  it('Should renders correct style for item text', () => {
    render(
      <>
        <Menubar.Item anchorProps={{ href: 'http://example.com' }}>
          Test Child 1
        </Menubar.Item>
        <Menubar.Item anchorProps={undefined} subItems={[{}]}>
          Test Child 2
        </Menubar.Item>
      </>
    );

    const menubarItems = screen.getAllByTestId('item-menubar');

    expect(menubarItems[0]).toHaveClass('hover:text-primary-medium');
    expect(menubarItems[1]).not.toHaveClass('hover:text-primary-medium');
  });
});
