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
});
