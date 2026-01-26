const darkColors = {
  body: '#1e1e1e',
  text: {
    default: '#fff',
  },
  surface: {
    base: '#1e1e1e',
    raised: '#252526',
    overlay: '#2d2d30',
    inverse: '#fff',
  },
  content: {
    high: '#f8f7f7',
    medium: '#c2bfbc',
    low: '#85807a',
    minimal: '#5d5955',
    inverse: '#353231',
  },
};

const colors = {
  primary: {
    xlight: 'var(--color-primary-xlight, #fef9f0)',
    light: 'var(--color-primary-light, #fccb83)',
    medium: 'var(--color-primary-medium, #f89907)',
    dark: 'var(--color-primary-dark, #ae6b05)',
    xdark: 'var(--color-primary-xdark, #633d03)',
  },
  secondary: {
    xlight: 'var(--color-secondary-xlight, #f8f7f7)',
    light: 'var(--color-secondary-light, #c2bfbc)',
    medium: 'var(--color-secondary-medium, #85807a)',
    dark: 'var(--color-secondary-dark, #5d5955)',
    xdark: 'var(--color-secondary-xdark, #353231)',
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
  surface: {
    base: 'var(--color-surface-base, #f8f7f7)',
    raised: 'var(--color-surface-raised, #fbfbfb)',
    overlay: 'var(--color-surface-overlay, #ffffff)',
    inverse: 'var(--color-surface-inverse, #000000)',
  },
  content: {
    high: 'var(--color-content-high, #353231)',
    medium: 'var(--color-content-medium, #5d5955)',
    low: 'var(--color-content-low, #85807a)',
    minimal: 'var(--color-content-minimal, #c2bfbc)',
    inverse: 'var(--color-content-inverse, #ffffff)',
  },
  error: {
    xlight: '#fdf3f2',
    light: '#ee9891',
    medium: '#e04638',
    dark: '#9b2318',
    xdark: '#58240e',
  },
  miscellaneous: {
    body: 'var(--color-body, #f8f7f7)',
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
  default: 'var(--color-text-default, #000)',
  light: '#fff',
  medium: '#85807a',
  dark: '#353231',
  orange: '#f89907',
};

const zIndex = {
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

export {
  borderColor,
  borderRadius,
  borderWidth,
  boxShadow,
  colors,
  darkColors,
  fontFamily,
  fontSize,
  spacing,
  textColor,
  zIndex,
};
