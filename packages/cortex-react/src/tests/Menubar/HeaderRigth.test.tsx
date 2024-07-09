import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';
import { Menubar } from '../../components/Menubar';

describe('HeaderRight Menubar', () => {
  it('Should render correctly', () => {
    const { getByTestId } = render(
      <Menubar.HeaderRight>Test Child</Menubar.HeaderRight>
    );
    expect(getByTestId('header-right-menubar')).toBeInTheDocument();
  });

  it('Should render children correctly', () => {
    const { getByText } = render(
      <Menubar.HeaderRight>Test Child</Menubar.HeaderRight>
    );
    expect(getByText('Test Child')).toBeInTheDocument();
  });
});
