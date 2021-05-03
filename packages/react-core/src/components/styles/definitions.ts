const white = '#fff';
const black = '#000';

const primaryGradation = {
  xlight: '#fef5e6',
  light: '#fbc26a',
  medium: '#f89907',
  dark: '#c77a05',
  xdark: '#633d03',
};

const secondaryGradation = {
  xlight: '#f8f7f7',
  light: '#c2bfbc',
  medium: '#85807a',
  dark: '#5d5955',
  xdark: '#282625',
};

export const lightTheme = {
  primary: {
    ...primaryGradation,
  },
  secondary: { ...secondaryGradation },
  error: {
    main: '#e25043',
    contrastText: black,
  },
  warning: {
    main: '#ffc700',
    contrastText: '#282625',
  },
  success: {
    main: '#2db783',
    contrastText: white,
  },
  info: { main: '#2a9ef6', contrastText: white },
  text: {
    main: '#282625',
    contrast: '#fff',
  },
};

const hex2rgba = (hex, alpha = 1) => {
  const [r, g, b] = hex.match(/\w\w/g).map(x => parseInt(x, 16));

  return `rgba(${r},${g},${b},${alpha})`;
};

export const misc = {
  shadow: 'rgba(133, 128, 122, 0.2)',
  overlay: 'rgba(40, 38, 37, 0.5)',
  bodyBg: '#f8f7f7',
  bodyColor: '#282625',
};

export const spacings = {
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

export const iconSizes = {
  centi: '1rem', // 16px
  deca: '1.5rem', // 24px
  kilo: '2rem', // 32px
};

export const borderRadius = {
  nano: '2px',
  micro: '4px',
  mili: '8px',
  circle: '100%',
  pill: '999999px',
};

export const borderWidth = {
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

export const fontStack = {
  default:
    'Lato, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  mono: 'Consolas, monaco, monospace',
};

export const fontWeight = {
  regular: '400',
  bold: '700',
  black: '900',
};

export const fontStyles = {
  normal: 'normal',
  italic: 'italic',
};

/*

2rem/32px	A Visual Type Scale - h1
1.625rem/26px	A Visual Type Scale - h2
1.25rem/20px	A Visual Type Scale - h3
1.125rem/18px	A Visual Type Scale - h4
1rem/16px	A Visual Type Scale - h5
0.875rem/14.00px	A Visual Type Scale - text
0.75rem/12px	A Visual Type Scale - subtitle
 */
