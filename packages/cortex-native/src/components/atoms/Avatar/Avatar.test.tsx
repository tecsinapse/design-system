import React from 'react';
import { render } from '@testing-library/react-native';

jest.mock('uniwind', () => ({
  useCSSVariable: () => '#ffffff',
}));

import Avatar, { AVATAR_SIZE_PX } from './Avatar';

describe('Avatar', () => {
  it('renders the initials fallback when no source is provided', () => {
    const { getByText } = render(<Avatar name="João da Silva" />);
    expect(getByText('Jd')).toBeTruthy();
  });
  it('renders a single-letter fallback for a one-word name', () => {
    const { getByText } = render(<Avatar name="Maria" />);
    expect(getByText('M')).toBeTruthy();
  });
  it('maps size tokens to pixel dimensions', () => {
    expect(AVATAR_SIZE_PX.mega).toBe(32);
    expect(AVATAR_SIZE_PX.kilo).toBe(24);
  });
});
