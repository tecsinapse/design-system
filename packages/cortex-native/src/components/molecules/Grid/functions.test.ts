import {
  getGridItemColumSpan,
  getGridItemPadding,
  SPACING_PX,
} from './functions';

describe('Grid functions', () => {
  it('computes column span as a percentage', () => {
    expect(getGridItemColumSpan(12, 6)).toBe(50);
    expect(getGridItemColumSpan(12, 3)).toBe(25);
    expect(getGridItemColumSpan(12, 12)).toBe(100);
  });

  it('maps a string spacing to px', () => {
    expect(getGridItemPadding('top', 'mili')).toBe(8);
    expect(getGridItemPadding('left', 'centi')).toBe(12);
  });

  it('maps an object spacing per position', () => {
    expect(
      getGridItemPadding('top', { top: 'deca', bottom: 'micro' }),
    ).toBe(16);
    expect(
      getGridItemPadding('bottom', { top: 'deca', bottom: 'micro' }),
    ).toBe(4);
    expect(getGridItemPadding('left', { top: 'deca' })).toBeUndefined();
  });

  it('returns undefined when no spacing', () => {
    expect(getGridItemPadding('top', undefined)).toBeUndefined();
  });

  it('exposes fixed spacing px values', () => {
    expect(SPACING_PX.mili).toBe(8);
    expect(SPACING_PX.hexa).toBe(64);
  });
});
