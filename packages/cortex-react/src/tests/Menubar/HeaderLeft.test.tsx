import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';
import { Menubar } from '../../components';

describe('HeaderLeft Menubar', () => {
  it('Should render children correctly', () => {
    const { getByTestId } = render(
      <Menubar.HeaderLeft>Test Child</Menubar.HeaderLeft>
    );
    expect(getByTestId('header-left-menubar')).toBeInTheDocument();
  });

  it('Should render children correctly', () => {
    const { getByText } = render(
      <Menubar.HeaderLeft>Test Child</Menubar.HeaderLeft>
    );
    expect(getByText('Test Child')).toBeInTheDocument();
  });
});
