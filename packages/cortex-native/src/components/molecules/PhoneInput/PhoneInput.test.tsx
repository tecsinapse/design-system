import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import './polyfills';
import PhoneInput from './PhoneInput';

jest.mock('uniwind', () => ({
  useCSSVariable: () => '#353231',
}));

jest.mock('react-native-country-flag', () => ({
  __esModule: true,
  default: () => null,
}));

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));

const mockSetCountry = jest.fn();
const mockHandlePhoneValueChange = jest.fn();

jest.mock('react-international-phone', () => {
  const br = {
    name: 'Brazil',
    iso2: 'br',
    dialCode: '55',
    format: '+.. ....-....',
  };
  return {
    usePhoneInput: () => ({
      phone: '+55',
      inputValue: '+55',
      country: br,
      setCountry: mockSetCountry,
      handlePhoneValueChange: mockHandlePhoneValueChange,
      inputRef: { current: null },
    }),
    parseCountry: () => br,
    defaultCountries: [],
  };
});

jest.mock('../../atoms/Icon/Icon', () => {
  const { Text } = require('react-native');
  return {
    __esModule: true,
    default: (props: { name: string }) => <Text>{props.name}</Text>,
  };
});

describe('PhoneInput', () => {
  it('shims global.document for react-international-phone on Hermes', () => {
    expect(globalThis.document).toBeTruthy();
  });

  it('renders the phone input value from react-international-phone', () => {
    const { getByDisplayValue } = render(<PhoneInput onChange={() => {}} />);
    expect(getByDisplayValue('+55')).toBeTruthy();
  });

  it('forwards typed text to the phone change handler', () => {
    const { getByPlaceholderText } = render(
      <PhoneInput placeholder="phone" onChange={() => {}} />
    );
    fireEvent.changeText(getByPlaceholderText('phone'), '+55119');
    expect(mockHandlePhoneValueChange).toHaveBeenCalled();
  });

  it('renders the label and hint', () => {
    const { getByText } = render(
      <PhoneInput label="Phone" hint="digits only" onChange={() => {}} />
    );
    expect(getByText('Phone')).toBeTruthy();
    expect(getByText('digits only')).toBeTruthy();
  });

  it('renders the flag trigger and chevron icon', () => {
    const { getByText } = render(<PhoneInput onChange={() => {}} />);
    expect(getByText('chevron-down')).toBeTruthy();
  });
});
