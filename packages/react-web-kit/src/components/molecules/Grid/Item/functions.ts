import {
  extractNumbersFromString,
  GridSpacing,
  PaddingPosition,
  Spacing,
} from '@tecsinapse/react-core';
import { Span } from './Item';

export const getPadding = (
  pos: PaddingPosition,
  _spacing: GridSpacing | undefined,
  themeSpacing: Spacing
) => {
  if (_spacing) {
    if (typeof _spacing === 'string')
      return extractNumbersFromString(themeSpacing[_spacing]);
    else if (typeof _spacing === 'object' && _spacing[pos]) {
      return extractNumbersFromString(themeSpacing[_spacing[pos] ?? '0']);
    } else return undefined;
  } else return undefined;
};

export const getSpan = (
  value: Span,
  sm: boolean,
  md: boolean,
  lg: boolean
): number => {
  if (sm) return value.sm;
  if (md) return value.md ?? value.sm;
  if (lg) return value.lg ?? value.md ?? value.sm;
  return 0;
};
