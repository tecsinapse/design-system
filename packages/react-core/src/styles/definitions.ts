import {
  BorderRadius,
  BorderWidth,
  FontStack,
  FontWeight,
  IconSizes,
  Miscellaneous,
  Spacings,
  ZIndex,
} from '../types/defaults';

export const white = '#fff';
export const black = '#000';

export const hex2rgba: (hex, alpha?: number) => string = (hex, alpha = 1) => {
  const [r, g, b] = hex.match(/\w\w/g).map(x => parseInt(x, 16));

  return `rgba(${r},${g},${b},${alpha})`;
};

export const miscellaneous: Miscellaneous = {
  shadow: 'rgba(133, 128, 122, 0.2)',
  overlay: 'rgba(40, 38, 37, 0.5)',
  bodyBg: '#f8f7f7',
  bodyColor: '#282625',
};

export const spacings: Spacings = {
  nano: '2px',
  micro: '4px',
  mili: '8px',
  centi: '16px',
  deca: '24px',
  kilo: '32px',
  mega: '40px',
  giga: '48px',
  tera: '56px',
  peta: '64px',
};

export const iconSizes: IconSizes = {
  centi: '1rem', // 16px
  deca: '1.5rem', // 24px
  kilo: '2rem', // 32px
};

export const borderRadius: BorderRadius = {
  nano: '2px',
  micro: '4px',
  mili: '8px',
  circle: '100%',
  pill: '999999px',
};

export const borderWidth: BorderWidth = {
  pico: '1px',
  nano: '2px',
};

export const typography = {
  headings: {
    h5: {
      fontSize: '1rem', // 16px
      lineHeight: '1.5rem', // 24px
    },
    h4: {
      fontSize: '1.125rem', // 18px
      lineHeight: '1.688rem', // 27px
    },
    h3: {
      fontSize: '1.25rem', // 20px
      lineHeight: '2rem', // 32px
    },
    h2: {
      fontSize: '1.625rem', // 26px
      lineHeight: '2.375rem', // 38px
    },
    h1: {
      fontSize: '2rem', // 32px
      lineHeight: '2.625rem', // 42px
    },
  },
  text: {
    base: {
      fontSize: '0.875rem', // 14px
      lineHeight: '1.313rem', // 21px
    },
    sub: {
      fontSize: '0.75rem', // 12px
      lineHeight: '1.125rem', // 18px
    },
  },
};

export const fontStack: FontStack = {
  default:
    'Lato, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  mono: 'Consolas, monaco, monospace',
};

export const fontWeight: FontWeight = {
  regular: '400',
  bold: '700',
  black: '900',
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
