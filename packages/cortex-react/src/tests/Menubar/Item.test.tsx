import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';
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
});
