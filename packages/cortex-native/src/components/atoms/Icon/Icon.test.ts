import { ICON_SIZE_PX, iconColorVar } from './utils';

describe('Icon utils', () => {
  it('maps variant+tone to the token variable name', () => {
    expect(iconColorVar('primary', 'medium')).toBe('--color-primary-medium');
  });
  it('falls back to the fontColor variable', () => {
    expect(iconColorVar(undefined, undefined, 'high')).toBe('--color-content-high');
  });
  it('maps size tokens to px numbers', () => {
    expect(ICON_SIZE_PX.centi).toBe(16);
  });
});