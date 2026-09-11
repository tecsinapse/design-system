import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

jest.mock('uniwind', () => ({
  useCSSVariable: (name: string) =>
    name === '--color-secondary-light' ? '#c2bfbc' : '#f89907',
}));

import LabeledSwitch from './LabeledSwitch';

describe('LabeledSwitch', () => {
  it('renders both left and right labels', () => {
    const { getByText } = render(
      <LabeledSwitch
        leftLabel="Left"
        rightLabel="Right"
        active={false}
        onChange={() => {}}
      />,
    );
    expect(getByText('Left')).toBeTruthy();
    expect(getByText('Right')).toBeTruthy();
  });

  it('toggles the switch and calls onChange with inverted state', () => {
    const onChange = jest.fn();
    const { getByRole } = render(
      <LabeledSwitch leftLabel="Left" active={false} onChange={onChange} />,
    );
    fireEvent.press(getByRole('switch'));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('presses the label to toggle when pressableLabel is set', () => {
    const onChange = jest.fn();
    const { getByText } = render(
      <LabeledSwitch
        leftLabel="Left"
        active={false}
        pressableLabel
        onChange={onChange}
      />,
    );
    fireEvent.press(getByText('Left'));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('does not press the label to toggle when pressableLabel is unset', () => {
    const onChange = jest.fn();
    const { getByText } = render(
      <LabeledSwitch leftLabel="Left" active={false} onChange={onChange} />,
    );
    fireEvent.press(getByText('Left'));
    expect(onChange).not.toHaveBeenCalled();
  });
});
