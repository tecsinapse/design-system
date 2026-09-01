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
    // The divider is a 1px-wide View (`w-[0.063rem]`, matching the legacy
    // borderWidth.pico token) painted with `bg-secondary-light`. Earlier the
    // className was `w-pico`, but `pico` only exists as a borderWidth token —
    // not as a spacing token — so the utility never compiled and the divider
    // rendered at 0 width. Asserting on the arbitrary-value utility locks the
    // width so it can't silently regress.
    const divider = root.findAll((n) =>
      n.props?.className?.includes('w-[0.063rem]'),
    )[0];
    expect(divider).toBeTruthy();
    expect(divider.props.className).toContain('bg-secondary-light');
  });
});
