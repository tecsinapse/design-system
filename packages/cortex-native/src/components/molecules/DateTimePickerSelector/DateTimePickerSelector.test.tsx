import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

jest.mock('uniwind', () => ({
  useCSSVariable: () => '#353231',
}));

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));

jest.mock('../../atoms/Icon/Icon', () => {
  const { Text } = require('react-native');
  return {
    __esModule: true,
    default: (props: { name: string }) => <Text>{props.name}</Text>,
  };
});

import DateTimePickerSelector from './DateTimePickerSelector';

const baseProps = {
  date: new Date(2026, 7, 15, 12, 30),
  setDate: () => {},
  currentMode: 0,
  isDate: true,
  isMonth: false,
  handlePressConfirm: () => {},
  handlePressBack: () => {},
  handleCalendarChange: () => {},
};

describe('DateTimePickerSelector', () => {
  it('renders the calendar when isDate is true', () => {
    const { getByText } = render(
      <DateTimePickerSelector {...baseProps} modalTitle="Pick date" />,
    );
    expect(getByText('Pick date')).toBeTruthy();
    expect(getByText('August 2026')).toBeTruthy();
  });

  it('renders the confirm button', () => {
    const { getByRole } = render(
      <DateTimePickerSelector {...baseProps} confirmButtonText="Confirm" />,
    );
    expect(getByRole('button')).toBeTruthy();
  });

  it('calls handlePressConfirm on confirm', () => {
    const handlePressConfirm = jest.fn();
    const { getByRole } = render(
      <DateTimePickerSelector
        {...baseProps}
        confirmButtonText="OK"
        handlePressConfirm={handlePressConfirm}
      />,
    );
    fireEvent.press(getByRole('button'));
    expect(handlePressConfirm).toHaveBeenCalled();
  });
});
