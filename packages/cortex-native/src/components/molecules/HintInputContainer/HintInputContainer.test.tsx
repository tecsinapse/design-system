import React from 'react';
import { Text } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';

jest.mock('uniwind', () => ({
  useCSSVariable: (name: string) => '#353231',
}));

jest.mock('../../atoms/Icon/Icon', () => {
  const { Text } = require('react-native');
  return {
    __esModule: true,
    default: (props: { name: string }) => <Text>{props.name}</Text>,
  };
});

import HintInputContainer from './HintInputContainer';

describe('HintInputContainer', () => {
  it('renders the hint text when hint is provided', () => {
    const { getByText } = render(
      <HintInputContainer focused hint="required" variant="error">
        <></>
      </HintInputContainer>,
    );
    expect(getByText('required')).toBeTruthy();
  });

  it('does not render a hint when hint is empty', () => {
    const { queryByText } = render(
      <HintInputContainer focused>
        <></>
      </HintInputContainer>,
    );
    expect(queryByText('required')).toBeNull();
  });

  it('forwards onPress to the pressable container', () => {
    const onPress = jest.fn();
    const { getByRole } = render(
      <HintInputContainer focused onPress={onPress}>
        <></>
      </HintInputContainer>,
    );
    fireEvent.press(getByRole('button'));
    expect(onPress).toHaveBeenCalled();
  });

  it('does not forward onPress when disabled', () => {
    const onPress = jest.fn();
    const { getByRole } = render(
      <HintInputContainer focused disabled onPress={onPress}>
        <></>
      </HintInputContainer>,
    );
    fireEvent.press(getByRole('button'));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('renders children inside the container', () => {
    const { getByText } = render(
      <HintInputContainer focused>
        <Text>child</Text>
      </HintInputContainer>,
    );
    expect(getByText('child')).toBeTruthy();
  });
});