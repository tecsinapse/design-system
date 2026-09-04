import { lightenDarkenColor } from './lightenDarkenColor';

describe('lightenDarkenColor', () => {
  it('lightens a hex color by a positive amount', () => {
    expect(lightenDarkenColor('#ffffff', -25)).toBe('#e6e6e6');
  });
  it('darkens a hex color by a negative amount', () => {
    expect(lightenDarkenColor('#000000', 25)).toBe('#191919');
  });
  it('clamps channel values at the bounds', () => {
    expect(lightenDarkenColor('#ffffff', 25)).toBe('#ffffff');
    expect(lightenDarkenColor('#000000', -25)).toBe('#0');
  });
  it('omits the pound prefix when the input has none', () => {
    expect(lightenDarkenColor('ffffff', -25)).toBe('e6e6e6');
  });
});
