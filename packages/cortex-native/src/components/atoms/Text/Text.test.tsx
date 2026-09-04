import { render } from '@testing-library/react-native';

import Text from './Text';
import { getLabel } from './functions';

describe('getLabel', () => {
  it('capitalizes the first letter when capitalFirst is true', () => {
    expect(getLabel('hello', true)).toBe('Hello');
  });
  it('keeps the label unchanged when capitalFirst is false', () => {
    expect(getLabel('hello', false)).toBe('hello');
  });
});

describe('Text', () => {
  it('passes through textTransform and style', () => {
    const { getByTestId } = render(
      <Text testID="t" textTransform="uppercase" style={{ color: '#fff' }}>
        hello
      </Text>,
    );
    expect(getByTestId('t').props.style).toEqual([
      { textTransform: 'uppercase' },
      { color: '#fff' },
    ]);
  });

  it('applies capitalFirst to the rendered children', () => {
    const { getByText } = render(<Text capitalFirst>hello</Text>);
    expect(getByText('Hello')).toBeTruthy();
  });

  it('emits the default fontColor class when no colorVariant is set', () => {
    const { getByTestId } = render(<Text testID="t">label</Text>);
    const className = getByTestId('t').props.className as string;
    expect(className).toContain('text-content-high');
  });

  it('does not emit the fontColor class when colorVariant is set', () => {
    const { getByTestId } = render(
      <Text testID="t" colorVariant="error">
        label
      </Text>,
    );
    const className = getByTestId('t').props.className as string;
    expect(className).toContain('text-error-medium');
    expect(className).not.toContain('text-content-high');
  });

  it('emits the fontColor class when no colorVariant is set', () => {
    const { getByTestId } = render(
      <Text testID="t" fontColor="orange">
        label
      </Text>,
    );
    const className = getByTestId('t').props.className as string;
    expect(className).toContain('text-orange');
    expect(className).not.toContain('text-error-');
  });

  it('keeps custom typography size classes when colorVariant is set (twMerge regression)', () => {
    const { getByTestId } = render(
      <Text testID="t" typography="h1" colorVariant="success">
        label
      </Text>,
    );
    const className = getByTestId('t').props.className as string;
    expect(className).toContain('text-h1');
    expect(className).toContain('leading-h1');
    expect(className).toContain('text-success-medium');
  });
});
