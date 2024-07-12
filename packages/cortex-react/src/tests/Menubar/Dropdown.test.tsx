import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';
import { Menubar } from '../../components';

jest.mock('../../styles/menubar', () => ({
  menubar: () => ({
    dropdown: () => 'mocked-dropdown-class',
  }),
  mostUsed: jest.fn(() => ({
    container: 'mocked-container-class',
    label: 'mocked-label-class',
    containerList: 'mocked-container-list-class',
  })),
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
  animate: jest
    .fn()
    .mockImplementation(({ show }) =>
      show ? 'mocked-animate-show' : 'mocked-animate-hide'
    ),
}));

const mockUseMenubar = jest.fn();

jest.mock('../../provider', () => ({
  useMenubar: () => mockUseMenubar(),
}));

describe('Dropdown Menubar', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should render correctly', () => {
    mockUseMenubar.mockReturnValue([true]);

    const { getByTestId } = render(<Menubar.Dropdown></Menubar.Dropdown>);
    const dropdown = getByTestId('dropdown-menubar');
    expect(dropdown).toBeInTheDocument();
  });

  it('Should renders children correctly', () => {
    mockUseMenubar.mockReturnValue([true]);

    const { getByText } = render(
      <Menubar.Dropdown>Test Child</Menubar.Dropdown>
    );
    expect(getByText('Test Child')).toBeInTheDocument();
  });

  it('Should applies the correct classes from menubar and animate when show is true', () => {
    mockUseMenubar.mockReturnValue([true]);

    const { container } = render(
      <Menubar.Dropdown>Test Child</Menubar.Dropdown>
    );
    expect(container.firstChild).toHaveClass('mocked-animate-show');
  });

  it('Should applies the correct classes from menubar and animate when show is false', () => {
    mockUseMenubar.mockReturnValue([false]);

    const { container } = render(
      <Menubar.Dropdown>Test Child</Menubar.Dropdown>
    );
    expect(container.firstChild).toHaveClass('mocked-dropdown-class');
    expect(container.firstChild).toHaveClass('mocked-animate-hide');
  });
});
