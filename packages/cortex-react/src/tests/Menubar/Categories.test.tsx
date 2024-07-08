import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';
import { Menubar } from '../../components/Menubar';

describe('Categories Menubar', () => {
  it('Should render correctly', () => {
    const { getByTestId } = render(
      <Menubar.Categories>
        <div>Test Child</div>
      </Menubar.Categories>
    );
    const masonry = getByTestId('masonry');
    expect(masonry).toBeInTheDocument();
  });

  it('Should renders children correctly', () => {
    const { getByText } = render(
      <Menubar.Categories>
        <div>Test Child</div>
      </Menubar.Categories>
    );
    expect(getByText('Test Child')).toBeInTheDocument();
  });
});
