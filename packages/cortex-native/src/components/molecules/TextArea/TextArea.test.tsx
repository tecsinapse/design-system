import React from 'react';
import { render } from '@testing-library/react-native';

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

import TextArea from './TextArea';

describe('TextArea', () => {
  it('renders the value in a multiline input', () => {
    const { getByDisplayValue } = render(<TextArea value="text" onChange={() => {}} />);
    expect(getByDisplayValue('text').props.multiline).toBe(true);
  });

  it('renders the char counter when maxLength is set', () => {
    const { getByText } = render(
      <TextArea value="abc" maxLength={10} onChange={() => {}} />,
    );
    expect(getByText('3/10')).toBeTruthy();
  });

  it('caps the counter at maxLength', () => {
    const { getByText } = render(
      <TextArea value="abcdefghijklmnop" maxLength={10} onChange={() => {}} />,
    );
    expect(getByText('10/10')).toBeTruthy();
  });

  it('does not render the counter when maxLength is unset', () => {
    const { queryByText } = render(<TextArea value="abc" onChange={() => {}} />);
    expect(queryByText('3/undefined')).toBeNull();
  });

  it('renders the hint when provided', () => {
    const { getByText } = render(
      <TextArea value="" hint="hint" onChange={() => {}} />,
    );
    expect(getByText('hint')).toBeTruthy();
  });
});