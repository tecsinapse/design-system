export type SpacingType =
  | 'nano'
  | 'micro'
  | 'mili'
  | 'centi'
  | 'deca'
  | 'kilo'
  | 'mega'
  | 'giga'
  | 'tera'
  | 'peta'
  | 'hexa';

export type FlexPositioning = 'flex-start' | 'flex-end' | 'center';
export type FlexAlignBase = FlexPositioning | 'stretch';
export type FlexAlignType = FlexAlignBase | 'baseline';
export type FlexSpacing = 'space-between' | 'space-around';
export type PaddingPosition = 'top' | 'right' | 'bottom' | 'left';

export type GridSpacing =
  | SpacingType
  | {
      top?: SpacingType;
      right?: SpacingType;
      bottom?: SpacingType;
      left?: SpacingType;
    };

/**
 * Fixed pixel values for the spacing tokens (RFValue responsive scaling is
 * intentionally NOT ported). Mirrors the legacy theme.spacing px numbers.
 */
export const SPACING_PX: Record<SpacingType, number> = {
  nano: 2,
  micro: 4,
  mili: 8,
  centi: 12,
  deca: 16,
  kilo: 24,
  mega: 32,
  giga: 40,
  tera: 48,
  peta: 56,
  hexa: 64,
};

export const getGridItemPadding = (
  pos: PaddingPosition,
  _spacing: GridSpacing | undefined
): number | undefined => {
  if (_spacing) {
    if (typeof _spacing === 'string') return SPACING_PX[_spacing];
    else if (typeof _spacing === 'object' && _spacing[pos]) {
      return SPACING_PX[_spacing[pos] ?? 'deca'];
    } else return undefined;
  } else return undefined;
};

export const getGridItemColumSpan = (
  columns: number,
  span: number
): number => 100 / (columns / span);
