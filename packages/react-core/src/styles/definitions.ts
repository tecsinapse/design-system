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
  ZIndex,
} from '../types/defaults';

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
  shadow: '#85807a', // rgba(133, 128, 122, 0.04)
  overlay: '#282625', // rgba(40, 38, 37, 0.5)
  bodyColor: '#f8f7f7',
  surfaceColor: '#fff', //input, group button, cards
};

export const spacing: Spacing = {
  nano: '2px',
  micro: '4px',
  mili: '8px',
  centi: '12px',
  deca: '16px',
  kilo: '24px',
  mega: '32px',
  giga: '40px',
  tera: '48px',
  peta: '56px',
  hexa: '64px',
};

export const iconSize: IconSize = {
  centi: '16px', // '1rem'
  deca: '24px', // '1.5rem'
  kilo: '32px', // '2rem'
};

export const borderRadius: BorderRadius = {
  nano: '2px',
  micro: '4px',
  mili: '8px',
  centi: '16px',
  deca: '24px',
  pill: '999999px', // also circle
};

export const borderWidth: BorderWidth = {
  pico: '1px',
  nano: '2px',
};

export const typography: TypographyVariation = {
  // TODO: H6 wasn't defined! It's the same of H5
  // h6: {
  //   // fontSize: '1rem', // 16px
  //   // lineHeight: '1.5rem', // 24px
  //   fontSize: '16px',
  //   lineHeight: '24px',
  // },
  h5: {
    fontSize: '16px', // '1rem'
    lineHeight: '24px', // '1.5rem'
  },
  h4: {
    fontSize: '18px', // '1.125rem'
    lineHeight: '27px', // '1.688rem'
  },
  h3: {
    fontSize: '20px', // '1.25rem'
    lineHeight: '32px', // '2rem'
  },
  h2: {
    fontSize: '26px', // '1.625rem'
    lineHeight: '38px', // '2.375rem'
  },
  h1: {
    fontSize: '32px', // '2rem'
    lineHeight: '42px', // '2.625rem'
  },
  base: {
    fontSize: '14px', // '0.875rem'
    lineHeight: '21px', // '1.313rem'
  },
  sub: {
    fontSize: '12px', // '0.75rem'
    lineHeight: '18px', // '1.125rem'
  },
  label: {
    fontSize: '10px',
    lineHeight: '12px',
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
  drawer: 10,
  select: 20,
  input: 20,
  popover: 30,
  tooltip: 40,
  header: 600,
  backdrop: 700,
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
