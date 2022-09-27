import { GridSpacing, PaddingPosition, Spacing } from '@tecsinapse/react-core';
import { extractNumbersFromString } from '../../../utils';

export const getGridItemPadding = (
  pos: PaddingPosition,
  _spacing: GridSpacing | undefined,
  themeSpacing: Spacing
): number | undefined => {
  if (_spacing) {
    if (typeof _spacing === 'string')
      return extractNumbersFromString(themeSpacing[_spacing]);
    else if (typeof _spacing === 'object' && _spacing[pos]) {
      return extractNumbersFromString(themeSpacing[_spacing[pos] ?? '0']);
    } else return undefined;
  } else return undefined;
};

/**
 * Calc the basis width percentage for a given item
 * @param columns - number of grid columns
 * @param span - number of columns to merge
 * @returns {number} - value in %
 */
export const getGridItemColumSpan = (columns: number, span: number): number =>
  100 / (columns / span);
