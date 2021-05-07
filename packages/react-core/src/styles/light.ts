import {
  borderRadius,
  borderWidth,
  fontColor,
  fontStack,
  fontWeight,
  iconSizes,
  miscellaneous,
  spacings,
  statusColors,
  typography,
  zIndex,
} from './definitions';

const primaryGradation = {
  xlight: '#fef9f0',
  light: '#fccb83',
  medium: '#f89907',
  dark: '#ae6b05',
  xdark: '#633d03',
};

const secondaryGradation = {
  xlight: '#f8f7f7',
  light: '#c2bfbc',
  medium: '#85807a',
  dark: '#5d5955',
  xdark: '#353231',
};

export const lightTheme = {
  colors: {
    primary: {
      ...primaryGradation,
    },
    secondary: { ...secondaryGradation },
    ...statusColors,
  },
  miscellaneous,
  spacings,
  iconSizes,
  borderRadius,
  borderWidth,
  typography,
  font: {
    color: fontColor,
    stack: fontStack,
    weight: fontWeight,
  },
  zIndex,
};
