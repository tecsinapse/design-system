import '@testing-library/jest-dom';
import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Menubar } from '../../components/Menubar';

const mockUseMenubar = jest.fn();

jest.mock('../../provider', () => ({
  useMenubar: () => mockUseMenubar(),
}));

describe('Header Menubar', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseMenubar.mockReturnValue([false, jest.fn()]);
  });

  it('Should render correctly', () => {
    const { getByTestId } = render(<Menubar.Header>Test Child</Menubar.Header>);
    expect(getByTestId('header-menubar')).toBeInTheDocument();
  });

  it('Should renders children correctly', () => {
    const { getByText } = render(<Menubar.Header>Test Child</Menubar.Header>);
    expect(getByText('Test Child')).toBeInTheDocument();
  });

  it('Should toggles show state when Button is clicked', () => {
    const setShow = jest.fn();
    mockUseMenubar.mockReturnValue([false, setShow]);
    const { getByRole } = render(<Menubar.Header>Test Child</Menubar.Header>);
    fireEvent.click(getByRole('button'));
    expect(setShow).toHaveBeenCalledWith(true);
  });
});
