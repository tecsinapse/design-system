import {
  buildPieSlices,
  buildSlicePath,
  computeSliceAngles,
  getFontFamilyAndWeight,
  getInnerRadius,
  getSliceOuterRadius,
  getTextStyles,
} from './utils';

const closeTo = (actual: number, expected: number) =>
  expect(actual).toBeCloseTo(expected, 6);

describe('computeSliceAngles', () => {
  const data = [
    { value: 1, label: 'a', color: 'primary-medium' },
    { value: 2, label: 'b', color: 'success-medium' },
    { value: 3, label: 'c', color: 'info-medium' },
  ];

  it('returns one slice per item in original data order', () => {
    const slices = computeSliceAngles(data);
    expect(slices.map(s => s.item.label)).toEqual(['a', 'b', 'c']);
  });

  it('assigns slice angles in descending value order (largest first, from 12 o\'clock)', () => {
    const slices = computeSliceAngles(data);
    // total 6 -> full turn per value is 2*PI/6 = PI/3
    // sorted by value desc: c(3), b(2), a(1)
    const c = slices[2];
    closeTo(c.startAngle, 0);
    closeTo(c.endAngle, Math.PI);

    const b = slices[1];
    closeTo(b.startAngle, Math.PI);
    closeTo(b.endAngle, (5 * Math.PI) / 3);

    const a = slices[0];
    closeTo(a.startAngle, (5 * Math.PI) / 3);
    closeTo(a.endAngle, Math.PI * 2);
  });

  it('sums all slice spans to a full turn', () => {
    const slices = computeSliceAngles(data);
    const total = slices.reduce(
      (sum, slice) => sum + (slice.endAngle - slice.startAngle),
      0,
    );
    closeTo(total, Math.PI * 2);
  });

  it('handles a single item as a full circle', () => {
    const slices = computeSliceAngles([{ value: 5, label: 'only', color: 'primary-medium' }]);
    closeTo(slices[0].startAngle, 0);
    closeTo(slices[0].endAngle, Math.PI * 2);
  });

  it('handles zero values without NaN angles', () => {
    const slices = computeSliceAngles([
      { value: 0, label: 'zero', color: 'primary-medium' },
      { value: 4, label: 'four', color: 'success-medium' },
    ]);
    // sorted desc: four (gets the full turn), zero (collapsed at the end)
    closeTo(slices[1].startAngle, 0);
    closeTo(slices[1].endAngle, Math.PI * 2);
    closeTo(slices[0].startAngle, Math.PI * 2);
    closeTo(slices[0].endAngle, Math.PI * 2);
    expect(slices[0].endAngle - slices[0].startAngle).toBe(0);
  });
});

describe('getSliceOuterRadius', () => {
  it('uses the full max radius for featured slices', () => {
    expect(getSliceOuterRadius(true, 100)).toBe(100);
  });

  it('uses 90% of max radius for regular slices', () => {
    expect(getSliceOuterRadius(false, 100)).toBe(90);
  });
});

describe('getInnerRadius', () => {
  it('keeps the ring thickness equal to the radius prop (legacy formula)', () => {
    // dimension 200 -> maxRadius 100; legacy inner = 90 - radius*100/100
    expect(getInnerRadius(32, 100)).toBe(58);
    expect(getInnerRadius(50, 100)).toBe(40);
    expect(getInnerRadius(20, 100)).toBe(70);
  });
});

describe('buildSlicePath', () => {
  it('builds the donut arc path for a half turn slice (d3-shape parity)', () => {
    expect(buildSlicePath(0, Math.PI, 100, 50)).toBe(
      'M 0 -100 A 100 100 0 1 1 0 100 L 0 50 A 50 50 0 1 0 0 -50 Z',
    );
  });

  it('builds the arc path for a 120 degree slice', () => {
    expect(buildSlicePath(Math.PI, (5 * Math.PI) / 3, 100, 50)).toBe(
      'M 0 100 A 100 100 0 0 1 -86.6025 -50 L -43.3013 -25 A 50 50 0 0 0 0 50 Z',
    );
  });

  it('builds the arc path for the trailing 60 degree slice', () => {
    expect(buildSlicePath((5 * Math.PI) / 3, Math.PI * 2, 100, 50)).toBe(
      'M -86.6025 -50 A 100 100 0 0 1 0 -100 L 0 -50 A 50 50 0 0 0 -43.3013 -25 Z',
    );
  });

  it('builds a full annulus path for a complete circle', () => {
    expect(buildSlicePath(0, Math.PI * 2, 100, 50)).toBe(
      'M 0 -100 A 100 100 0 1 1 0 100 A 100 100 0 1 1 0 -100 M 0 -50 A 50 50 0 1 0 0 50 A 50 50 0 1 0 0 -50 Z',
    );
  });

  it('collapses zero-span slices to a radial line', () => {
    expect(buildSlicePath(0, 0, 100, 50)).toBe('M 0 -100 L 0 -50 Z');
  });
});

describe('getFontFamilyAndWeight', () => {
  it('falls back to the default family and numeric weight', () => {
    expect(getFontFamilyAndWeight(undefined, 'bold')).toEqual({
      fontFamily: 'Lato',
      fontWeight: '700',
    });
  });

  it('uses a custom chart font family per weight', () => {
    const chartConfig = {
      fontFamily: {
        regular: 'Custom-Regular',
        bold: 'Custom-Bold',
        black: 'Custom-Black',
      },
    };
    expect(getFontFamilyAndWeight(chartConfig.fontFamily, 'regular')).toEqual({
      fontFamily: 'Custom-Regular',
      fontWeight: '400',
    });
  });
});

describe('getTextStyles', () => {
  it('applies legacy defaults for the center label', () => {
    const styles = getTextStyles(undefined, 'bold', undefined);
    expect(styles).toMatchObject({
      textAnchor: 'middle',
      alignmentBaseline: 'middle',
      fill: '--color-content-high',
      fontFamily: 'Lato',
      fontWeight: '700',
    });
  });

  it('merges user styles and resolves fill to a token variable', () => {
    const styles = getTextStyles(
      { fontSize: 20, fill: 'primary-medium', y: -8 },
      'regular',
      undefined,
    );
    expect(styles).toMatchObject({
      fontSize: 20,
      fill: '--color-primary-medium',
      y: -8,
      fontWeight: '400',
    });
  });

  it('uses the chart config family when provided', () => {
    const styles = getTextStyles(undefined, 'bold', {
      fontFamily: {
        regular: 'X-Regular',
        bold: 'X-Bold',
        black: 'X-Black',
      },
    });
    expect(styles).toMatchObject({ fontFamily: 'X-Bold' });
  });
});

describe('buildPieSlices', () => {
  it('composes angles, radii and path for a known dataset', () => {
    const slices = buildPieSlices(
      [
        { value: 1, label: 'a', color: 'primary-medium' },
        { value: 2, label: 'b', color: 'success-medium' },
        { value: 3, label: 'c', color: 'info-medium', featured: true },
      ],
      32,
      200,
    );

    expect(slices).toHaveLength(3);
    closeTo(slices[2].startAngle, 0);
    closeTo(slices[2].endAngle, Math.PI);
    expect(slices[2].outerRadius).toBe(100);
    expect(slices[2].innerRadius).toBe(58);
    expect(slices[2].d).toBe('M 0 -100 A 100 100 0 1 1 0 100 L 0 58 A 58 58 0 1 0 0 -58 Z');

    expect(slices[0].outerRadius).toBe(90);
    closeTo(slices[0].startAngle, (5 * Math.PI) / 3);
  });
});