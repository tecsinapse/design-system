import type { TextStyle } from 'react-native';

export type FontWeight = 'regular' | 'bold' | 'black';

export type FontFamily = {
  regular: string;
  bold: string;
  black: string;
};

export type PieChartData = {
  value: number;
  label: string;
  featured?: boolean;
  color: string;
  onPress?: (value: number, label?: string) => void;
};

export type AlignmentBaseline =
  | 'baseline'
  | 'text-bottom'
  | 'alphabetic'
  | 'ideographic'
  | 'middle'
  | 'central'
  | 'mathematical'
  | 'text-top'
  | 'bottom'
  | 'center'
  | 'top'
  | 'text-before-edge'
  | 'text-after-edge'
  | 'before-edge'
  | 'after-edge'
  | 'hanging';

export type TextAnchor = 'start' | 'middle' | 'end';

export type SvgTextType = {
  textAnchor?: TextAnchor;
  alignmentBaseline?: AlignmentBaseline;
  fontSize?: number;
  fontWeight?: FontWeight;
  fill?: string;
  y?: number;
};

/** Single font family per RN (legacy nativeFontStack split per-weight files is dropped). */
export const DEFAULT_FONT_FAMILY = 'Lato';

export const FONT_WEIGHT_VALUE: Record<FontWeight, TextStyle['fontWeight']> = {
  regular: '400',
  bold: '700',
  black: '900',
};

/** Default center-label fill: legacy fontColor.dark -> Task 5 rename to content-high. */
export const LABEL_FILL_VAR = '--color-content-high';

/** Regular (non-featured) slice outer radius is 90% of the chart max radius (legacy arc.outerRadius). */
export const SLICE_OUTER_RADIUS_RATIO = 0.9;

/** Maps a prop-valued token color key to its CSS variable name for runtime resolution. */
export const chartColorVar = (color: string): string => `--color-${color}`;

export const getFontFamilyAndWeight = (
  fontFamily: FontFamily | undefined,
  weight: FontWeight
): { fontFamily: string; fontWeight: TextStyle['fontWeight'] } => ({
  fontFamily: fontFamily ? fontFamily[weight] : DEFAULT_FONT_FAMILY,
  fontWeight: FONT_WEIGHT_VALUE[weight],
});

export const getTextStyles = (
  styles: SvgTextType | undefined,
  defaultFontWeight: FontWeight,
  chartConfig: { fontFamily: FontFamily } | undefined
): {
  textAnchor: TextAnchor;
  alignmentBaseline: AlignmentBaseline;
  fontSize: number | undefined;
  fontWeight: TextStyle['fontWeight'];
  fontFamily: string;
  fill: string;
  y: number | undefined;
} => {
  const {
    textAnchor = 'middle',
    alignmentBaseline = 'middle',
    fontSize,
    fill,
    y,
  } = styles || {};
  return {
    textAnchor,
    alignmentBaseline,
    fontSize,
    fill: fill ? chartColorVar(fill) : LABEL_FILL_VAR,
    y,
    ...getFontFamilyAndWeight(
      chartConfig?.fontFamily,
      styles?.fontWeight ?? defaultFontWeight
    ),
  };
};

export const getSliceOuterRadius = (
  featured: boolean,
  maxRadius: number
): number => (featured ? maxRadius : SLICE_OUTER_RADIUS_RATIO * maxRadius);

/**
 * Legacy inner radius: inner = 90 - radius*100/maxRadius, applied as a % of maxRadius
 * -> 0.9*maxRadius - radius. The donut ring thickness of a regular slice equals `radius`.
 */
export const getInnerRadius = (radius: number, maxRadius: number): number =>
  SLICE_OUTER_RADIUS_RATIO * maxRadius - radius;

export interface PieSlice {
  item: PieChartData;
  value: number;
  startAngle: number;
  endAngle: number;
}

/**
 * Computes slice angles replicating d3-shape `pie()` (react-native-svg-charts' runtime):
 * slices are laid out in descending value order starting at 12 o'clock, but returned in
 * original data order, each carrying its own item (color/label/onPress).
 */
export const computeSliceAngles = (data: PieChartData[]): PieSlice[] => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const order = data
    .map((_, index) => index)
    .sort((a, b) => data[b].value - data[a].value);
  const slices = new Array<PieSlice>(data.length);
  let angle = 0;
  for (const index of order) {
    const value = data[index].value;
    const span = total > 0 ? (value / total) * Math.PI * 2 : 0;
    slices[index] = {
      item: data[index],
      value,
      startAngle: angle,
      endAngle: angle + span,
    };
    angle += span;
  }
  return slices;
};

const TAU = Math.PI * 2;
const EPSILON = 1e-6;

const round = (n: number): number => Math.round(n * 10000) / 10000;

const point = (angle: number, radius: number): { x: number; y: number } => ({
  x: round(Math.cos(angle) * radius),
  y: round(Math.sin(angle) * radius),
});

/**
 * Builds the SVG arc path `d` for a donut slice, replicating d3-shape `arc()`
 * (cornerRadius 0, padAngle 0) as emitted by d3-path: angles shifted by -PI/2
 * (0 at 12 o'clock), outer arc clockwise (sweep 1), inner arc back counter-clockwise
 * (sweep 0). Values are rounded to 4 decimals for stable output.
 */
export const buildSlicePath = (
  startAngle: number,
  endAngle: number,
  outerRadius: number,
  innerRadius: number
): string => {
  const a0 = startAngle - Math.PI / 2;
  const a1 = endAngle - Math.PI / 2;
  const span = Math.abs(a1 - a0);

  const oStart = point(a0, outerRadius);
  const oEnd = point(a1, outerRadius);
  const iStart = point(a1, innerRadius);
  const iEnd = point(a0, innerRadius);

  if (span >= TAU - EPSILON) {
    return [
      `M ${oStart.x} ${oStart.y}`,
      `A ${outerRadius} ${outerRadius} 0 1 1 ${-oStart.x} ${-oStart.y}`,
      `A ${outerRadius} ${outerRadius} 0 1 1 ${oStart.x} ${oStart.y}`,
      `M ${iStart.x} ${iStart.y}`,
      `A ${innerRadius} ${innerRadius} 0 1 0 ${-iStart.x} ${-iStart.y}`,
      `A ${innerRadius} ${innerRadius} 0 1 0 ${iStart.x} ${iStart.y}`,
      'Z',
    ].join(' ');
  }

  if (span <= EPSILON) {
    return `M ${oStart.x} ${oStart.y} L ${iStart.x} ${iStart.y} Z`;
  }

  const outerLarge = span >= Math.PI ? 1 : 0;
  const innerLarge = span >= Math.PI ? 1 : 0;

  return [
    `M ${oStart.x} ${oStart.y}`,
    `A ${outerRadius} ${outerRadius} 0 ${outerLarge} 1 ${oEnd.x} ${oEnd.y}`,
    `L ${iStart.x} ${iStart.y}`,
    `A ${innerRadius} ${innerRadius} 0 ${innerLarge} 0 ${iEnd.x} ${iEnd.y}`,
    'Z',
  ].join(' ');
};

export interface BuiltPieSlice extends PieSlice {
  d: string;
  outerRadius: number;
  innerRadius: number;
}

/** Wires angles, per-slice radii (featured vs regular) and arc paths together. */
export const buildPieSlices = (
  data: PieChartData[],
  radius: number,
  dimension: number
): BuiltPieSlice[] => {
  const maxRadius = dimension / 2;
  const innerRadius = getInnerRadius(radius, maxRadius);
  return computeSliceAngles(data).map(slice => {
    const outerRadius = getSliceOuterRadius(
      slice.item.featured ?? false,
      maxRadius
    );
    return {
      ...slice,
      outerRadius,
      innerRadius,
      d: buildSlicePath(
        slice.startAngle,
        slice.endAngle,
        outerRadius,
        innerRadius
      ),
    };
  });
};
