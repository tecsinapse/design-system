import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ActivityIndicator, Text } from 'react-native';
import Button from './Button';

jest.mock('uniwind', () => ({
  useCSSVariable: (name: string) =>
    name === '--color-on-primary' ? '#ffffff' : '#f89907',
}));

describe('Button', () => {
  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByRole } = render(<Button title="ok" onPress={onPress} />);
    fireEvent.press(getByRole('button'));
    expect(onPress).toHaveBeenCalled();
  });
  it('does not call onPress when disabled', () => {
    const onPress = jest.fn();
    const { getByRole } = render(<Button title="ok" onPress={onPress} disabled />);
    fireEvent.press(getByRole('button'));
    expect(onPress).not.toHaveBeenCalled();
  });
  it('does not call onPress when loading', () => {
    const onPress = jest.fn();
    const { getByRole } = render(<Button title="ok" onPress={onPress} loading />);
    fireEvent.press(getByRole('button'));
    expect(onPress).not.toHaveBeenCalled();
  });
  it('composes filled primary classes with readable on-primary text', () => {
    const { getByRole } = render(<Button title="ok" intent="primary" variant="filled" />);
    const className = getByRole('button').props.className as string;
    expect(className).toContain('bg-primary-medium');
    expect(className).toContain('text-on-primary');
  });
  it('uses on-primary text for filled success (no same-on-same)', () => {
    const { getByRole } = render(<Button title="ok" intent="success" variant="filled" />);
    const className = getByRole('button').props.className as string;
    expect(className).toContain('bg-success-medium');
    expect(className).toContain('text-on-primary');
    expect(className).not.toContain('text-success-medium');
  });
  it('uses intent text color for outline variant', () => {
    const { getByRole } = render(<Button title="ok" intent="success" variant="outline" />);
    const className = getByRole('button').props.className as string;
    expect(className).toContain('bg-transparent');
    expect(className).toContain('text-success-medium');
    expect(className).not.toContain('text-on-primary');
  });
  it('resolves filled spinner color from the on-primary variable', () => {
    const { UNSAFE_getByType } = render(<Button title="ok" intent="primary" variant="filled" loading />);
    expect(UNSAFE_getByType(ActivityIndicator).props.color).toBe('#ffffff');
  });
  it('resolves outline spinner color from the intent variable', () => {
    const { UNSAFE_getByType } = render(<Button title="ok" intent="primary" variant="outline" loading />);
    expect(UNSAFE_getByType(ActivityIndicator).props.color).toBe('#f89907');
  });
  it('renders children instead of title when both are provided', () => {
    const { getByText, queryByText } = render(
      <Button title="ignored">
        <Text>composed</Text>
      </Button>
    );
    expect(getByText('composed')).toBeTruthy();
    expect(queryByText('ignored')).toBeNull();
  });
  it('still renders the title when no children are given', () => {
    const { getByText } = render(<Button title="plain" />);
    expect(getByText('plain')).toBeTruthy();
  });
  it('renders the spinner instead of children while loading', () => {
    const { queryByText } = render(
      <Button loading>
        <Text>composed</Text>
      </Button>
    );
    expect(queryByText('composed')).toBeNull();
  });
});

describe('Button compound', () => {
  it('exposes parts with Root aliasing the callable', () => {
    expect(Button.Root).toBe(Button);
    expect(Button.Label).toBeDefined();
    expect(Button.Icon).toBeDefined();
  });

  it('tints composed parts with the resolved foreground colour', () => {
    const { getByTestId, getByText } = render(
      <Button intent="primary" variant="filled">
        <Button.Icon testID="icon" name="check" type="ionicon" />
        <Button.Label>save</Button.Label>
      </Button>
    );
    expect(getByText('save')).toBeTruthy();
    expect(getByTestId('icon')).toBeTruthy();
  });

  it('throws when a part is used outside a Button', () => {
    expect(() => render(<Button.Label>x</Button.Label>)).toThrow(/must be used within/);
  });
});
