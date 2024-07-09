import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';
import MostUsedList from '../../components/Menubar/MostUsedList';

const mostUsed = [
  { title: 'Most Used 1', category: 'Category 1' },
  { title: 'Most Used 2', category: 'Category 2' },
  { title: 'Most Used 3', category: 'Category 2' },
  { title: 'Most Used 4', category: 'Category 2' },
  { title: 'Most Used 5', category: 'Category 2' },
  { title: 'Most Used 6', category: 'Category 2' },
];

describe('MostUsedList Menubar', () => {
  it('Should render correctly', () => {
    const { getAllByTestId } = render(<MostUsedList mostUsed={mostUsed} />);
    expect(getAllByTestId('most-used-item-menubar')).toBeInTheDocument();
  });

  it('Should render only four first items', () => {
    const { getAllByTestId } = render(<MostUsedList mostUsed={mostUsed} />);
    expect(getAllByTestId('most-used-item-menubar')).toHaveLength(4);
  });
});
