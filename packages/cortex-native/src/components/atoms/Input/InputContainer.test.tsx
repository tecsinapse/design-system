import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import InputContainer from './InputContainer';

describe('InputContainer', () => {
  it('lays side components out in a row (flex-row)', () => {
    const { getByTestId } = render(
      <InputContainer
        testID="container"
        leftComponent={<Text>L</Text>}
        rightComponent={<Text>R</Text>}
      >
        <Text>content</Text>
      </InputContainer>
    );
    const className = getByTestId('container').props.className as string;
    expect(className).toContain('flex-row');
  });
});
