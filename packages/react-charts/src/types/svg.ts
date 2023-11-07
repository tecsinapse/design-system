import { FontWeight } from './font';

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
  // fontFamily: string;
  fill?: string;
  y?: number;
};
