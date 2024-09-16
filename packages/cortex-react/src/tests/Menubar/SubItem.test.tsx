import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';
import { Menubar } from '../../components';

describe('SubItem Menubar', () => {
  it('Should render correctly', () => {
    const { getByTestId } = render(
      <Menubar.SubItem>Test Child</Menubar.SubItem>
    );
    expect(getByTestId('sub-item-menubar')).toBeInTheDocument();
  });

  it('Should renders children correctly', () => {
    const { getByText } = render(<Menubar.SubItem>Test Child</Menubar.SubItem>);
    expect(getByText('Test Child')).toBeInTheDocument();
  });

  it('Should renders as a link when href is provided', () => {
    const { container } = render(
      <Menubar.SubItem anchorProps={{ href: 'http://example.com' }}>
        Test Child
      </Menubar.SubItem>
    );
    expect(container.querySelector('a')).toHaveAttribute(
      'href',
      'http://example.com'
    );
  });
});
