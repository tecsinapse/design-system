import React from 'react';
import { Text } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';

jest.mock('../../atoms/Icon/Icon', () => {
  const { Text } = require('react-native');
  return {
    __esModule: true,
    default: (props: { name: string }) => <Text>{props.name}</Text>,
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
    const { getByText } = render(
      <Snackbar open leftIcon={{ name: 'info', type: 'ionicon' }}>
        Hello
      </Snackbar>,
    );
    expect(getByText('info')).toBeTruthy();
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
