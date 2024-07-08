import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';
import { Menubar } from '../../components/Menubar';

describe('MostUsed Menubar', () => {
  it('Should render label correctly', () => {
    const { getByTestId } = render(<Menubar.MostUsed label="Test Label" />);
    expect(getByTestId('most-used-menubar')).toBeInTheDocument();
  });

  it('Should render label correctly', () => {
    const { getByText } = render(<Menubar.MostUsed label="Test Label" />);
    expect(getByText('Test Label')).toBeInTheDocument();
  });

  it('Should render children correctly', () => {
    const { getByText } = render(
      <Menubar.MostUsed>Test Child</Menubar.MostUsed>
    );
    expect(getByText('Test Child')).toBeInTheDocument();
  });
});
