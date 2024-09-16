import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';
import { CategoryType, Menubar } from '../../components';

jest.mock('../../styles/menubar', () => ({
  category: () => ({
    text: () => 'mocked-text-class',
    hr: () => 'mocked-hr-class',
    container: () => 'mocked-container-class',
  }),
  menubar: () => ({
    left: 'mocked-left',
  }),
  mostUsed: () => ({
    container: 'mocked-container-class',
    label: 'mocked-label-class',
    containerList: 'mocked-container-list-class',
  }),
  mostUsedItem: () => ({
    title: 'mocked-title-class',
    category: 'mocked-category-class',
    container: 'mocked-container-class',
  }),
  item: () => ({
    icon: 'mocked-item-icon',
  }),
  subItem: () => ({
    container: 'mocked-container-class',
  }),
}));

describe('Category Menubar', () => {
  it('Should renders title correctly', () => {
    const categoryProps: CategoryType<string> = {
      title: 'Test Title',
      options: [],
      render: () => null,
    };
    const { getByText } = render(<Menubar.Category {...categoryProps} />);
    expect(getByText('Test Title')).toBeInTheDocument();
  });

  it('Should renders hr with correct class', () => {
    const categoryProps: CategoryType<string> = {
      title: 'Test Title',
      options: [],
      render: () => null,
    };
    const { container } = render(<Menubar.Category {...categoryProps} />);
    expect(container.querySelector('hr')).toHaveClass('mocked-hr-class');
  });

  it('Should renders options using the render function', () => {
    const categoryProps: CategoryType<string> = {
      title: 'Test Title',
      options: ['Option 1', 'Option 2'],
      render: option => <div key={option}>{option}</div>,
    };
    const { getByText } = render(<Menubar.Category {...categoryProps} />);
    expect(getByText('Option 1')).toBeInTheDocument();
    expect(getByText('Option 2')).toBeInTheDocument();
  });

  it('Should applies the correct classes from category', () => {
    const categoryProps: CategoryType<string> = {
      title: 'Test Title',
      options: ['Option 1'],
      render: option => <div key={option}>{option}</div>,
    };
    const { container } = render(<Menubar.Category {...categoryProps} />);
    expect(container.querySelector('p')).toHaveClass('mocked-text-class');
    expect(container.querySelector('div')).toHaveClass(
      'mocked-container-class'
    );
  });
});
