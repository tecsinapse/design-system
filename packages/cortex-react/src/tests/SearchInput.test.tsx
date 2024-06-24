import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import SearchInput from '../components/SearchInput';

describe('Search Input', () => {
  it('Should render', () => {
    render(<SearchInput />);
    const searchInput = screen.getByTestId('input-input');
    fireEvent.change(searchInput, { target: { value: 'search text' } });
    expect(searchInput).toHaveValue('search text');
  });

  it('Should render with button search', () => {
    render(<SearchInput onClick={jest.fn} />);
    const searchInput = screen.getByTestId('icon-search');
    expect(searchInput).toBeInTheDocument();
  });

  it('Should render feedback loading', () => {
    render(<SearchInput onClick={jest.fn} isSubmitting={true} />);
    const iconLoading = screen.getByTestId('icon-loading');

    expect(iconLoading).toBeInTheDocument();
  });
});
