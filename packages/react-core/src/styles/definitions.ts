import {
  BorderRadius,
  BorderWidth,
  FontColor,
  FontStack,
  FontWeight,
  IconSize,
  Miscellaneous,
  Spacing,
  TypographyVariation,
  ZIndex
} from '../types/defaults';
import { RFValueStr } from '../utils';

export const statusColor = {
  error: {
    xlight: '#fdf3f2',
    light: '#ee9891',
    medium: '#e04638',
    dark: '#9b2318',
    xdark: '#58240e',
  },
  warning: {
    xlight: '#fffcf0',
    light: '#ffe380',
    medium: '#ffc700',
    dark: '#cc9f00',
    xdark: '#665000',
  },
  success: {
    xlight: '#f3fcf8',
    light: '#99e6c9',
    medium: '#2db783',
    dark: '#238f67',
    xdark: '#14523b',
  },
  info: {
    xlight: '#f0f8fe',
    light: '#85c7fa',
    medium: '#239bf6',
    dark: '#0873c4',
    xdark: '#043962',
  },
};

export const hex2rgba: (hex, alpha?: number) => string = (hex, alpha = 1) => {
  const [r, g, b] = hex.match(/\w\w/g).map(x => parseInt(x, 16));
  return `rgba(${r},${g},${b},${alpha})`;
};

export const miscellaneous: Miscellaneous = {
  shadow: '#000000', // black
  overlay: '#282625', // rgba(40, 38, 37, 0.5)
  bodyColor: '#f8f7f7',
  surfaceColor: '#ffffff', //input, group button, cards
};

export const spacing: Spacing = {
  nano: RFValueStr('2px'),
  micro: RFValueStr('4px'),
  mili: RFValueStr('8px'),
  centi: RFValueStr('12px'),
  deca: RFValueStr('16px'),
  kilo: RFValueStr('24px'),
  mega: RFValueStr('32px'),
  giga: RFValueStr('40px'),
  tera: RFValueStr('48px'),
  peta: RFValueStr('56px'),
  hexa: RFValueStr('64px'),
};

export const iconSize: IconSize = {
  micro: RFValueStr('12px'),
  mili: RFValueStr('14px'),
  centi: RFValueStr('16px'), // '1rem'
  deca: RFValueStr('18px'), // '1.5rem'
  kilo: RFValueStr('24px'), // '1.6rem'
  mega: RFValueStr('32px'), // '2rem'
};

export const borderRadius: BorderRadius = {
  nano: RFValueStr('2px'),
  micro: RFValueStr('4px'),
  mili: RFValueStr('8px'),
  centi: RFValueStr('16px'),
  deca: RFValueStr('24px'),
  pill: RFValueStr('999999px'), // also circle
};

export const borderWidth: BorderWidth = {
  pico: RFValueStr('1px'),
  nano: RFValueStr('2px'),
};

export const typography: TypographyVariation = {
  h5: {
    fontSize: RFValueStr('16px'), // '1rem'
    lineHeight: RFValueStr('24px'), // '1.5rem'
  },
  h4: {
    fontSize: RFValueStr('18px'), // '1.125rem'
    lineHeight: RFValueStr('27px'), // '1.688rem'
  },
  h3: {
    fontSize: RFValueStr('20px'), // '1.25rem'
    lineHeight: RFValueStr('32px'), // '2rem'
  },
  h2: {
    fontSize: RFValueStr('26px'), // '1.625rem'
    lineHeight: RFValueStr('38px'), // '2.375rem'
  },
  h1: {
    fontSize: RFValueStr('32px'), // '2rem'
    lineHeight: RFValueStr('42px'), // '2.625rem'
  },
  base: {
    fontSize: RFValueStr('14px'), // '0.875rem'
    lineHeight: RFValueStr('21px'), // '1.313rem'
  },
  sub: {
    fontSize: RFValueStr('12px'), // '0.75rem'
    lineHeight: RFValueStr('18px'), // '1.125rem'
  },
  label: {
    fontSize: RFValueStr('10px'),
    lineHeight: RFValueStr('12px'),
  },
};

export const fontStack: FontStack = {
  default: 'Lato',
  mono: 'Consolas, monaco, monospace',
};

export const fontWeight: FontWeight = {
  regular: '400',
  bold: '700',
  black: '900',
};

export const fontFiles: FontWeight = {
  black: '{0}-Black',
  bold: '{0}-Bold',
  regular: '{0}-Regular',
};

export const fontColor: FontColor = {
  light: '#fff',
  medium: '#85807a',
  dark: '#353231', // default
  orange: '#f89907',
};

export const zIndex: ZIndex = {
  default: 0,
  absolute: 1,
  select: 20,
  input: 20,
  popover: 30,
  tooltip: 40,
  header: 600,
  backdrop: 700,
  drawer: 700,
  sidebar: 800,
  modal: 1000,
};

export type IconType =
  | 'material'
  | 'material-community'
  | 'simple-line-icon'
  | 'zocial'
  | 'font-awesome'
  | 'octicon'
  | 'ionicon'
  | 'foundation'
  | 'evilicon'
  | 'entypo'
  | 'antdesign'
  | 'font-awesome-5'
  | string;
