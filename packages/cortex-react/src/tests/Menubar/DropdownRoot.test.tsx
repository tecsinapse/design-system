import '@testing-library/jest-dom';
import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Menubar } from '../../components';

describe('DropdownRoot Menubar', () => {
  it('Should renders most used items when provided', () => {
    const mostUsed = [
      { title: 'Most Used 1', category: 'Category 1' },
      { title: 'Most Used 2', category: 'Category 2' },
    ];
    const options = [
      {
        title: 'Category 1',
        items: [{ title: 'Item 1', items: [{ title: 'SubItem 1' }] }],
      },
    ];
    const { getByTestId, getAllByTestId } = render(
      <Menubar.DropdownRoot
        mostUsed={mostUsed}
        options={options}
        labelMostUsed="Most Used"
      />
    );

    expect(getByTestId('most-used-menubar')).toBeInTheDocument();
    expect(getAllByTestId('most-used-item-menubar')).toHaveLength(2);
  });

  it('Should renders categories and items correctly', () => {
    const options = [
      {
        title: 'Category 1',
        items: [{ title: 'Item 1', items: [{ title: 'SubItem 1' }] }],
      },
    ];
    const { getAllByTestId, getByText, getByTestId } = render(
      <Menubar.DropdownRoot options={options} />
    );

    expect(getByText(options[0].title)).toBeInTheDocument();
    expect(getAllByTestId('item-menubar')).toHaveLength(1);
    fireEvent.click(getByTestId('icon-sub-item-menubar'));
    expect(getByTestId('sub-item-menubar')).toBeInTheDocument();
  });

  it('Should does not render most used section when mostUsed is not provided', () => {
    const options = [
      {
        title: 'Category 1',
        items: [{ title: 'Item 1', items: [{ title: 'SubItem 1' }] }],
      },
    ];
    const { queryByTestId } = render(
      <Menubar.DropdownRoot options={options} />
    );

    expect(queryByTestId('most-used')).not.toBeInTheDocument();
  });
});
