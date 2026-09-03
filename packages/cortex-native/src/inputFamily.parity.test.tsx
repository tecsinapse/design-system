import React from 'react';
import { render } from '@testing-library/react-native';

jest.mock('uniwind', () => ({
  useCSSVariable: () => '#ffffff',
}));

import Input from './components/atoms/Input/Input';
import InputMask from './components/molecules/InputMask/InputMask';
import InputPassword from './components/molecules/InputPassword/InputPassword';
import TextArea from './components/molecules/TextArea/TextArea';

const chrome = (node: React.ReactElement) => {
  const { getByTestId } = render(node);
  return getByTestId('face').props.className as string;
};

describe('input family shares one chrome implementation', () => {
  it('renders the same container classes as Input for the same variant', () => {
    const base = chrome(
      <Input inputContainerTestID="face" variant="error" value="x" />
    );
    expect(
      chrome(
        <InputMask
          inputContainerTestID="face"
          variant="error"
          mask={['999']}
          value="1"
        />
      )
    ).toBe(base);
    expect(
      chrome(
        <InputPassword inputContainerTestID="face" variant="error" value="x" />
      )
    ).toBe(base);
    expect(
      chrome(<TextArea inputContainerTestID="face" variant="error" value="x" />)
    ).toBe(base);
  });
});
