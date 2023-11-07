import { Platform } from 'react-native';
import {
  AlignmentBaseline,
  FontFamily,
  FontWeight,
  SvgTextType,
  TextAnchor,
} from '../../types';
import { fontColor, getFontFamilyAndWeight } from '../../styles';

type CallbackReturn =
  | Record<string, unknown>
  | { onClick: () => undefined }
  | { onPress: () => undefined };

export const getCallback = (
  value: number,
  label?: string,
  fn?: (value: number, label?: string) => void
): CallbackReturn => {
  if (!fn) return {};
  return Platform.OS === 'web'
    ? {
        onClick: () => fn?.(value, label),
      }
    : {
        onPress: () => fn?.(value, label),
      };
};

type FeaturedType = { arc: { outerRadius: string } };

export const getFeatured = (featured: boolean): FeaturedType => ({
  arc: { outerRadius: featured ? '100%' : '90%' },
});

type TextStylesReturn = {
  fontFamily: string;
  y: number | undefined;
  fontSize: number | undefined;
  textAnchor: TextAnchor;
  fill: string;
  alignmentBaseline: AlignmentBaseline;
  fontWeight: string;
};

export const getTextStyles = (
  styles: SvgTextType | undefined,
  defaultFontWeight: FontWeight,
  chartConfig: { fontFamily: FontFamily } | undefined
): TextStylesReturn => {
  const {
    textAnchor = 'middle',
    alignmentBaseline = 'middle',
    fontSize,
    fill = fontColor.dark,
    y,
  } = styles || {};
  return {
    textAnchor,
    alignmentBaseline,
    fontSize,
    fill,
    y,
    ...getFontFamilyAndWeight(
      chartConfig?.fontFamily,
      styles?.fontWeight ?? defaultFontWeight
    ),
  };
};
