import React from 'react';
import { Text } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';

jest.mock('../../atoms/Icon/Icon', () => {
  const { Text } = require('react-native');
  return {
    __esModule: true,
    default: ({
      name,
      colorVariant,
      colorTone,
    }: {
      name: string;
      colorVariant?: string;
      colorTone?: string;
    }) => (
      <Text testID={`icon-${name}`}>{`${name}:${colorVariant}:${colorTone}`}</Text>
    ),
  };
});

import Snackbar from './Snackbar';

describe('Snackbar', () => {
  it('renders children when open', () => {
    const { getByText } = render(
      <Snackbar open>
        <Text>Hello</Text>
      </Snackbar>,
    );
    expect(getByText('Hello')).toBeTruthy();
  });

  it('renders nothing when closed', () => {
    const { queryByText } = render(
      <Snackbar open={false}>
        <Text>Hello</Text>
      </Snackbar>,
    );
    expect(queryByText('Hello')).toBeNull();
  });

  it('renders the left icon', () => {
    const { getByTestId } = render(
      <Snackbar open leftIcon={{ name: 'info', type: 'ionicon' }}>
        Hello
      </Snackbar>,
    );
    expect(getByTestId('icon-info')).toBeTruthy();
  });

  it('calls onClose when the dismiss button is pressed', () => {
    jest.useFakeTimers();
    const onClose = jest.fn();
    const { getByRole } = render(
      <Snackbar open dismissable onClose={onClose}>
        Hello
      </Snackbar>,
    );
    fireEvent.press(getByRole('button'));
    jest.runAllTimers();
    expect(onClose).toHaveBeenCalled();
    jest.useRealTimers();
  });
});

describe('Snackbar compound', () => {
  it('exposes parts with Root aliasing the callable', () => {
    expect(Snackbar.Root).toBe(Snackbar);
    ['Icon', 'Content', 'Action'].forEach(p =>
      expect(Snackbar[p as 'Icon']).toBeDefined(),
    );
  });

  it('renders composed parts and fires the action', () => {
    jest.useFakeTimers();
    const onClose = jest.fn();
    const { getByText, getByRole } = render(
      <Snackbar open onClose={onClose}>
        <Snackbar.Icon name="check" type="ionicon" />
        <Snackbar.Content>
          <Text>saved</Text>
        </Snackbar.Content>
        <Snackbar.Action />
      </Snackbar>,
    );
    expect(getByText('saved')).toBeTruthy();
    fireEvent.press(getByRole('button'));
    jest.runAllTimers();
    expect(onClose).toHaveBeenCalled();
    jest.useRealTimers();
  });

  it('still renders the legacy leftIcon and dismissable affordance', () => {
    const { getByRole } = render(
      <Snackbar open dismissable leftIcon={{ name: 'info', type: 'ionicon' }}>
        <Text>legacy</Text>
      </Snackbar>,
    );
    expect(getByRole('button')).toBeTruthy();
  });
});

describe('Snackbar composed icon tint', () => {
  it('resolves composed Snackbar.Icon / Snackbar.Action to the same tint as the legacy leftIcon / dismissable path', () => {
    const { getByTestId: getByTestIdComposed } = render(
      <Snackbar open>
        <Snackbar.Icon name="check" type="ionicon" />
        <Snackbar.Content>
          <Text>saved</Text>
        </Snackbar.Content>
        <Snackbar.Action />
      </Snackbar>,
    );
    const { getByTestId: getByTestIdLegacy } = render(
      <Snackbar open dismissable leftIcon={{ name: 'info', type: 'ionicon' }}>
        <Text>legacy</Text>
      </Snackbar>,
    );

    const composedIconTint = getByTestIdComposed('icon-check').props.children;
    const composedActionTint = getByTestIdComposed('icon-close').props.children;
    const legacyLeftIconTint = getByTestIdLegacy('icon-info').props.children;
    const legacyActionTint = getByTestIdLegacy('icon-close').props.children;

    expect(composedIconTint).toBe('check:primary:medium');
    expect(composedActionTint).toBe('close:primary:medium');
    expect(legacyLeftIconTint).toBe('info:primary:medium');
    expect(legacyActionTint).toBe('close:primary:medium');
  });

  it('lets an explicit colorTone on Snackbar.Icon win over the context default', () => {
    const { getByTestId } = render(
      <Snackbar open>
        <Snackbar.Icon name="check" type="ionicon" colorTone="dark" />
      </Snackbar>,
    );

    expect(getByTestId('icon-check').props.children).toBe('check:primary:dark');
  });
});
