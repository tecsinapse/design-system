import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

jest.mock('../Icon/Icon', () => {
  const { Text } = require('react-native');
  return {
    __esModule: true,
    default: (props: { name: string }) => <Text>{props.name}</Text>,
  };
});

import Tag from './Tag';

describe('Tag', () => {
  it('applies the default background tone class', () => {
    const { getByTestId } = render(<Tag testID="t" value="label" />);
    const className = getByTestId('t').props.className as string;
    expect(className).toContain('bg-secondary-xlight');
  });
  it('maps backgroundColorTone/Variant to the token class', () => {
    const { getByTestId } = render(
      <Tag testID="t" value="label" backgroundColorTone="success" backgroundColorVariant="medium" />,
    );
    const className = getByTestId('t').props.className as string;
    expect(className).toContain('bg-success-medium');
  });
  it('applies small variant padding by default', () => {
    const { getByTestId } = render(<Tag testID="t" value="label" />);
    const className = getByTestId('t').props.className as string;
    expect(className).toContain('rounded-micro');
  });
  it('applies default variant padding when requested', () => {
    const { getByTestId } = render(<Tag testID="t" value="label" variant="default" />);
    const className = getByTestId('t').props.className as string;
    expect(className).toContain('rounded-mili');
  });
  it('calls onDismiss when the close button is pressed', () => {
    const onDismiss = jest.fn();
    const { getAllByRole } = render(<Tag value="label" dismiss onDismiss={onDismiss} />);
    fireEvent.press(getAllByRole('button')[0]);
    expect(onDismiss).toHaveBeenCalled();
  });
});
