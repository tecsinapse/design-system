import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import GroupButton, { GroupButtonProps } from './GroupButton';
import GroupButtonOption from './GroupButtonOption';

const options = [
  { value: 'a', options: {} },
  { value: 'b', options: {} },
];

const renderGroup = (value: string, props: Partial<GroupButtonProps<string>> = {}) =>
  render(
    <GroupButton
      value={value}
      options={options}
      renderKey={(o) => o}
      renderOption={(option, active) => (
        <GroupButtonOption active={active} description={String(option)} />
      )}
      onChange={() => {}}
      {...props}
    />,
  );

describe('GroupButton', () => {
  it('marks the selected option active and the other inactive', () => {
    const { getByText } = renderGroup('b');
    expect(getByText('b')).toBeTruthy();
    expect(getByText('a')).toBeTruthy();
  });
  it('calls onChange with the pressed option value', () => {
    const onChange = jest.fn();
    const { getByText } = renderGroup('a', { onChange });
    fireEvent.press(getByText('b'));
    expect(onChange).toHaveBeenCalledWith('b');
  });
  it('renders a divider between options', () => {
    const { root } = renderGroup('a');
    const divider = root.findAll((n) => n.props?.className?.includes('w-pico'))[0];
    expect(divider.props.className).toContain('bg-secondary-light');
  });
});
