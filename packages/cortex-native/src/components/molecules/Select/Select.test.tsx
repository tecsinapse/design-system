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

import Select from './Select';

type Item = { id: number; label: string };

const options: Item[] = [
  { id: 1, label: 'Alpha' },
  { id: 2, label: 'Beta' },
  { id: 3, label: 'Gamma' },
];

const keyExtractor = (i: Item) => String(i.id);
const labelExtractor = (i: Item) => i.label;

const baseProps = {
  options,
  keyExtractor,
  labelExtractor,
  type: 'single' as const,
  onSelect: () => {},
};

describe('Select', () => {
  it('renders the placeholder when there is no value', () => {
    const { getByText } = render(
      <Select {...baseProps} value={null} placeholder="pick one" />,
    );
    expect(getByText('pick one')).toBeTruthy();
  });

  it('renders the selected value label', () => {
    const { getByText } = render(
      <Select {...baseProps} value={{ id: 2, label: 'Beta' }} placeholder="pick" />,
    );
    expect(getByText('Beta')).toBeTruthy();
  });

  it('renders the chevron trigger', () => {
    const { getByText } = render(
      <Select {...baseProps} value={null} placeholder="pick" />,
    );
    expect(getByText('chevron-down')).toBeTruthy();
  });

  it('opens the modal and calls onSelect when an option is picked', () => {
    const onSelect = jest.fn();
    const { getByText, getByRole } = render(
      <Select
        {...baseProps}
        value={null}
        placeholder="pick"
        selectModalTitle="Choose"
        onSelect={onSelect}
      />,
    );
    fireEvent.press(getByRole('button'));
    expect(getByText('Choose')).toBeTruthy();
    fireEvent.press(getByText('Alpha'));
    expect(onSelect).toHaveBeenCalledWith(
      expect.objectContaining({ id: 1, label: 'Alpha' })
    );
  });
});
