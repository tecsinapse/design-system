import {
  black,
  borderRadius,
  borderWidth,
  fontStack,
  fontWeight,
  iconSizes,
  miscellaneous,
  spacings,
  typography,
  white,
  zIndex,
} from './definitions';

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
  miscellaneous,
  spacings,
  iconSizes,
  borderRadius,
  borderWidth,
  typography,
  fontStack,
  fontWeight,
  zIndex,
};
