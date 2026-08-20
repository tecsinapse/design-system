import React from 'react';
import { Dimensions, Keyboard } from 'react-native';
import { act, fireEvent, render } from '@testing-library/react-native';
import Select from './Select';

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
      <Select {...baseProps} value={null} placeholder="pick one" />
    );
    expect(getByText('pick one')).toBeTruthy();
  });

  it('renders the selected value label', () => {
    const { getByText } = render(
      <Select
        {...baseProps}
        value={{ id: 2, label: 'Beta' }}
        placeholder="pick"
      />
    );
    expect(getByText('Beta')).toBeTruthy();
  });

  it('renders the chevron trigger', () => {
    const { getByText } = render(
      <Select {...baseProps} value={null} placeholder="pick" />
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
      />
    );
    fireEvent.press(getByRole('button'));
    expect(getByText('Choose')).toBeTruthy();
    fireEvent.press(getByText('Alpha'));
    expect(onSelect).toHaveBeenCalledWith(
      expect.objectContaining({ id: 1, label: 'Alpha' })
    );
  });

  it('renders a backdrop and closes the modal when tapping outside', () => {
    const onSelect = jest.fn();
    const { getByText, getByRole, getByTestId, queryByText } = render(
      <Select
        {...baseProps}
        value={null}
        placeholder="pick"
        selectModalTitle="Choose"
        onSelect={onSelect}
      />
    );

    fireEvent.press(getByRole('button'));
    expect(getByText('Choose')).toBeTruthy();
    expect(getByTestId('select-backdrop')).toBeTruthy();

    fireEvent.press(getByTestId('select-backdrop'));
    expect(queryByText('Choose')).toBeNull();
  });

  it('raises the options list when the keyboard opens', () => {
    const listeners: Record<string, (e?: any) => void> = {};
    jest.spyOn(Keyboard, 'addListener').mockImplementation(((
      type: string,
      cb: (e?: any) => void
    ) => {
      listeners[type] = cb;
      return { remove: jest.fn() };
    }) as unknown as typeof Keyboard.addListener);
    jest.spyOn(Dimensions, 'get').mockImplementation(((key: string) => {
      if (key === 'window' || key === 'screen') {
        return { height: 700, width: 400, scale: 1, fontScale: 1 };
      }
      return {};
    }) as unknown as typeof Dimensions.get);

    const { getByRole, getByTestId } = render(
      <Select
        {...baseProps}
        value={null}
        placeholder="pick"
        selectModalTitle="Choose"
      />
    );
    fireEvent.press(getByRole('button'));

    const sheet = getByTestId('select-sheet');
    expect(sheet.props.style.paddingBottom).toBe(0);

    act(() => {
      listeners.keyboardDidShow?.({ endCoordinates: { height: 300 } });
    });
    expect(getByTestId('select-sheet').props.style.paddingBottom).toBe(300);
  });
});
