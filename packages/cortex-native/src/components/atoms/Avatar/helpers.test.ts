import { getIniciais } from './helpers';

describe('getIniciais', () => {
  it('returns the initials of the first two words', () => {
    expect(getIniciais('João da Silva')).toBe('Jd');
  });
  it('returns the first letter for a single word', () => {
    expect(getIniciais('Maria')).toBe('M');
  });
  it('handles empty strings gracefully', () => {
    expect(getIniciais('')).toBe(undefined);
  });
});
