import React from 'react';
import { TextInput } from 'react-native';
import { render } from '@testing-library/react-native';
import { Masks } from '@tecsinapse/cortex-core';

jest.mock('uniwind', () => ({
  useCSSVariable: () => '#ffffff',
}));

import Input from './components/atoms/Input/Input';
import InputElement from './components/atoms/Input/InputElement';
import InputMask from './components/molecules/InputMask/InputMask';
import InputPassword from './components/molecules/InputPassword/InputPassword';

describe('ref as a plain prop (React 19)', () => {
  it.each([
    ['Input', (ref: React.Ref<TextInput>) => <Input ref={ref} />],
    ['InputElement', (ref: React.Ref<TextInput>) => <InputElement ref={ref} />],
    ['InputMask', (ref: React.Ref<TextInput>) => <InputMask ref={ref} mask={Masks.CEP} />],
    ['InputPassword', (ref: React.Ref<TextInput>) => <InputPassword ref={ref} />],
  ])('%s attaches its ref to the underlying TextInput', (_name, renderWithRef) => {
    const ref = React.createRef<TextInput>();
    render(renderWithRef(ref));
    expect(ref.current).not.toBeNull();
    expect(typeof ref.current?.focus).toBe('function');
  });
});
