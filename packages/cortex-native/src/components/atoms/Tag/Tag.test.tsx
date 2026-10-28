import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

jest.mock('uniwind', () => ({
  useCSSVariable: () => '#ffffff',
}));

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

describe('Tag compound', () => {
  it('exposes parts with Root aliasing the callable', () => {
    expect(Tag.Root).toBe(Tag);
    ['Icon', 'Label', 'Close'].forEach(p => expect(Tag[p as 'Icon']).toBeDefined());
  });

  it('renders composed parts and dismisses through context', () => {
    const onDismiss = jest.fn();
    const { getByText, getByRole } = render(
      <Tag onDismiss={onDismiss}>
        <Tag.Icon name="star" type="ionicon" />
        <Tag.Label>composed</Tag.Label>
        <Tag.Close />
      </Tag>
    );
    expect(getByText('composed')).toBeTruthy();
    fireEvent.press(getByRole('button'));
    expect(onDismiss).toHaveBeenCalled();
  });

  it('still supports the legacy value and icon props', () => {
    const { getByText } = render(<Tag value="legacy" icon={{ name: 'star', type: 'ionicon' }} />);
    expect(getByText('legacy')).toBeTruthy();
  });

  it('purges the inline marginLeft style from Tag.Close in favor of className', () => {
    const { getByRole } = render(
      <Tag>
        <Tag.Close />
      </Tag>
    );
    const closeButton = getByRole('button');
    const className = closeButton.props.className as string;
    expect(className).toContain('ml-[2px]');
    const { StyleSheet } = require('react-native');
    expect(StyleSheet.flatten(closeButton.props.style)?.marginLeft).toBeUndefined();
  });
});
