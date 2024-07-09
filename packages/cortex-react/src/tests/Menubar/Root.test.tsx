import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';
import { Menubar } from '../../components';

describe('Root Menubar', () => {
  it('Should renders children correctly', () => {
    const { getByText } = render(<Menubar.Root>Test Child</Menubar.Root>);
    expect(getByText('Test Child')).toBeInTheDocument();
  });
});
