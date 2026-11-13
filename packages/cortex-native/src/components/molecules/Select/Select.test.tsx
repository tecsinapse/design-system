import React from 'react';
import { Dimensions, Keyboard, Text } from 'react-native';
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
  it('shows the supplied empty message when a select has no options', () => {
    const { getByRole, getByText } = render(
      <Select
        {...baseProps}
        emptyText="Nothing available"
        options={[]}
        value={null}
      />
    );
    fireEvent.press(getByRole('button'));
    expect(getByText('Nothing available')).toBeTruthy();
  });

  it('shows the search-empty message for an empty grouped result', async () => {
    const { getByRole, getByPlaceholderText, findByText } = render(
      <Select
        {...baseProps}
        emptyText="Nothing available"
        emptySearchText="No matches"
        options={new Map([['Group', []]])}
        value={null}
        searchBarPlaceholder="Search"
      />
    );
    fireEvent.press(getByRole('button'));
    fireEvent.changeText(getByPlaceholderText('Search'), 'missing');
    expect(await findByText('No matches')).toBeTruthy();
  });

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

  it('limits the selected label to one line unless overridden', () => {
    const { getByText, rerender } = render(
      <Select {...baseProps} value={options[0]} />
    );
    expect(getByText('Alpha').props.numberOfLines).toBe(1);

    rerender(<Select {...baseProps} value={options[0]} numberOfLines={3} />);
    expect(getByText('Alpha').props.numberOfLines).toBe(3);
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
    expect(onSelect).toHaveBeenCalledWith({ ...options[0], _checked: false });
  });

  it('selects a primitive option without changing the value passed to callbacks', () => {
    const onSelect = jest.fn();
    const { getByText, getByRole } = render(
      <Select
        options={['Alpha', 'Beta']}
        type="single"
        value={undefined}
        onSelect={onSelect}
        keyExtractor={item => item}
        labelExtractor={item => item}
        placeholder="pick"
      />
    );
    fireEvent.press(getByRole('button'));
    fireEvent.press(getByText('Alpha'));
    expect(onSelect).toHaveBeenCalledWith('Alpha');
  });

  it('selects zero from grouped numeric options', () => {
    const onSelect = jest.fn();
    const { getByText, getByRole } = render(
      <Select
        options={new Map([['Numbers', [0, 1]]])}
        type="single"
        value={undefined}
        onSelect={onSelect}
        keyExtractor={item => String(item)}
        labelExtractor={item => `Number ${item}`}
        placeholder="pick"
      />
    );
    fireEvent.press(getByRole('button'));
    fireEvent.press(getByText('Number 0'));
    expect(onSelect).toHaveBeenCalledWith(0);
  });

  it('displays and selects zero in a multi-select', () => {
    const onSelect = jest.fn();
    const props = {
      options: [0, 1],
      type: 'multi' as const,
      onSelect,
      keyExtractor: (item: number) => String(item),
      labelExtractor: (item: number) => `Number ${item}`,
      placeholder: 'pick',
    };
    const { getByText, getByRole, rerender } = render(
      <Select {...props} value={[]} />
    );
    fireEvent.press(getByRole('button'));
    fireEvent.press(getByText('Number 0'));
    fireEvent.press(getByText('Confirm'));
    expect(onSelect).toHaveBeenCalledWith([0]);
    rerender(<Select {...props} value={[0]} />);
    expect(getByText('Number 0')).toBeTruthy();
    fireEvent.press(getByRole('button'));
    expect(getByRole('checkbox', { checked: true })).toBeTruthy();
  });

  it('displays zero as a selected single value', () => {
    const { getByText } = render(
      <Select
        options={[0, 1]}
        type="single"
        value={0}
        onSelect={() => {}}
        keyExtractor={item => String(item)}
        labelExtractor={item => `Number ${item}`}
        placeholder="pick"
      />
    );
    expect(getByText('Number 0')).toBeTruthy();
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

  it('renders a close button and closes the modal when tapping it', () => {
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
    expect(getByTestId('select-close-button')).toBeTruthy();

    fireEvent.press(getByTestId('select-close-button'));
    expect(queryByText('Choose')).toBeNull();
    expect(onSelect).not.toHaveBeenCalled();
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

describe('Select compound', () => {
  it('exposes parts with Root aliasing the callable', () => {
    expect(Select.Root).toBe(Select);
    (['Trigger', 'Sheet', 'Search', 'Options', 'Confirm'] as const).forEach(
      part => expect(Select[part]).toBeDefined()
    );
  });

  it('supports legacy object-shaped data in custom options', () => {
    const { getByText } = render(
      <Select.Options
        options={options}
        getData={items => items.map(item => ({ ...item, _checked: false }))}
        keyExtractor={keyExtractor}
        renderItem={({ item }) => <Text>{item.label}</Text>}
      />
    );
    expect(getByText('Alpha')).toBeTruthy();
    expect(getByText('Beta')).toBeTruthy();
  });

  it('opens the sheet from the composed trigger and selects an option', () => {
    const onSelect = jest.fn();
    const { getByText, getByTestId } = render(
      <Select
        {...baseProps}
        value={null}
        placeholder="pick"
        selectModalTitle="Choose"
        onSelect={onSelect}
      />
    );
    fireEvent.press(getByTestId('select-trigger'));
    expect(getByTestId('select-sheet')).toBeTruthy();
    fireEvent.press(getByText('Alpha'));
    expect(onSelect).toHaveBeenCalledWith(
      expect.objectContaining({ id: 1, label: 'Alpha' })
    );
  });

  it('still honours the legacy controlComponent render prop', () => {
    const { getByText } = render(
      <Select
        {...baseProps}
        value={null}
        controlComponent={(onPress, display) => (
          <Text onPress={onPress}>custom {display}</Text>
        )}
      />
    );
    expect(getByText(/custom/)).toBeTruthy();
  });
});
