import { extractNumbersFromString } from './extractNumbersFromString';

describe('extractNumbersFromString', () => {
  it('extracts the numeric part of a string', () => {
    expect(extractNumbersFromString('75%')).toBe(75);
  });
  it('returns 0 when there are no digits', () => {
    expect(extractNumbersFromString('abc')).toBe(0);
  });
  it('handles plain numbers', () => {
    expect(extractNumbersFromString('42')).toBe(42);
  });
});
