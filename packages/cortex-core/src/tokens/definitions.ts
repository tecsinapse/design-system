const colors = {
  primary: {
    xlight: '#fef9f0',
    light: '#fccb83',
    medium: '#f89907',
    dark: '#ae6b05',
    xdark: '#633d03',
  },
  secondary: {
    xlight: '#f8f7f7',
    light: '#c2bfbc',
    medium: '#85807a',
    dark: '#5d5955',
    xdark: '#353231',
  },
  info: {
    xlight: '#f0f8fe',
    light: '#85c7fa',
    medium: '#239bf6',
    dark: '#0873c4',
    xdark: '#043962',
  },
  success: {
    xlight: '#f3fcf8',
    light: '#99e6c9',
    medium: '#2db783',
    dark: '#238f67',
    xdark: '#14523b',
  },
  warning: {
    xlight: '#fffcf0',
    light: '#ffe380',
    medium: '#ffc700',
    dark: '#cc9f00',
    xdark: '#665000',
  },
  error: {
    xlight: '#fdf3f2',
    light: '#ee9891',
    medium: '#e04638',
    dark: '#9b2318',
    xdark: '#58240e',
  },
  miscellaneous: {
    body: '#f8f7f7',
  },
};

const spacing = {
  nano: '0.125rem',
  micro: '0.25rem',
  mili: '0.5rem',
  centi: '0.75rem',
  deca: '1rem',
  kilo: '1.5rem',
  mega: '2rem',
  giga: '2.5rem',
  tera: '3rem',
  peta: '3.5rem',
  hexa: '4rem',
};

const borderRadius = {
  nano: '0.125rem',
  micro: '0.25rem',
  mili: '0.5rem',
  centi: '1rem',
  deca: '1.5rem',
  pill: '999999px',
};

const borderWidth = {
  pico: '0.063rem',
  nano: '0.125rem',
};

const fontSize = {
  /** Font sizes */
  h5: [
    '1rem', // "16px"
    '1.5rem', // "24px"
  ],
  h4: [
    '1.125rem', // "18px"
    '1.688rem', // "27px"
  ],
  h3: [
    '1.25rem', // "20px"
    '2rem', // "32px"
  ],
  h2: [
    '1.625rem', // "26px"
    '2.375rem', // "38px"
  ],
  h1: [
    '2rem', // "32px"
    '2.625rem', // "42px"
  ],
  base: [
    '0.875rem', // "14px"
    '1.313rem', // "21px"
  ],
  sub: [
    '0.75rem', // "12px"
    '1.125rem', // "18px"
  ],
  label: ['0.625rem', '0.75rem'], // '10px', '12px'
  /** Icon sizes */
  micro: '0.75rem', // "12px"
  mili: '0.875rem', // "14px"
  centi: '1rem', // "16px"
  deca: '1.125rem', // "18px"
  kilo: '1.5rem', // "24px"
  mega: '2rem', // "32px"
};

const boxShadow = {
  default: '0 2px 8px rgba(0, 0, 0, 0.05)',
};

const borderColor = {
  'success-light': '#99E6C9',
};

const fontFamily = {
  sans: [
    'Lato',
    'system-ui',
    '-apple-system',
    'BlinkMacSystemFont',
    'sans-serif',
    'Apple Color Emoji',
    'Segoe UI Emoji',
    'Segoe UI Symbol',
    'Noto Color Emoji',
  ],
  mono: 'Consolas, monaco, monospace',
};

const textColor = {
  light: '#fff',
  medium: '#85807a',
  dark: '#353231',
  orange: '#f89907',
};

export {
  colors,
  textColor,
  borderColor,
  borderWidth,
  boxShadow,
  borderRadius,
  spacing,
  fontSize,
  fontFamily,
};
