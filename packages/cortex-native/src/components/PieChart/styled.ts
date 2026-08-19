import {
  Circle as RNSCircle,
  G as RNSG,
  Path as RNSPath,
  Svg as RNSSvg,
  Text as RNSvgText,
} from 'react-native-svg';
import { withUniwind } from 'uniwind';

/**
 * react-native-svg primitives do not accept className on their own; `withUniwind`
 * (Uniwind 1.x) is the supported path — auto mode converts `className` → `style`,
 * which react-native-svg merges into SVG presentation attributes (propsAndStyles).
 */
export const Svg = withUniwind(RNSSvg);
export const G = withUniwind(RNSG);
export const Path = withUniwind(RNSPath);
export const Circle = withUniwind(RNSCircle);
export const SvgText = withUniwind(RNSvgText);

/** Layout classes for the chart container (column, centered, full flex). */
export const CONTAINER_CLASS = 'flex-col items-center justify-between flex-1';

/** Layout classes for the legend row (wrap items across the full width). */
export const LABELS_CONTAINER_CLASS = 'flex-row flex-wrap justify-between w-full';

/** Layout classes for one legend item (dot + label + value on a row). */
export const LABEL_CONTAINER_CLASS = 'flex-row items-center mb-centi';

/** Legend text size (legacy 14px); flex-1 expansion is applied by Label.tsx when needed. */
export const LABEL_TEXT_CLASS = 'text-base';

/** Legend dot marker viewport (12px = legacy iconSize.micro) and right margin (spacing.centi). */
export const DOT_SVG_CLASS = 'mr-centi';