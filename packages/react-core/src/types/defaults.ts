export type ColorType =
  | 'primary'
  | 'secondary'
  | 'error'
  | 'success'
  | 'info'
  | 'warning';

export type VariantType = 'filled' | 'outlined' | 'text';

export type ColorScale = 'xlight' | 'light' | 'medium' | 'dark' | 'xdark';

export type FontColorScale = 'light' | 'medium' | 'dark' | 'orange';

export type BorderRadiusType = 'nano' | 'micro' | 'mili' | 'circle' | 'pill';

export type Miscellaneous = {
  shadow: string;
  overlay: string;
  bodyBg: string;
  bodyColor: string;
};

export type Spacings = {
  nano: string;
  micro: string;
  mili: string;
  centi: string;
  deca: string;
  kilo: string;
  mega: string;
  giga: string;
  tera: string;
  peta: string;
};

export type IconSizes = {
  centi: string;
  deca: string;
  kilo: string;
};

export type BorderRadius = {
  nano: string;
  micro: string;
  mili: string;
  circle: string;
  pill: string;
};

export type BorderWidth = {
  pico: string;
  nano: string;
};

export type Typography = {
  lineHeight: string;
  fontSize: string;
};

export type ColorGradation = {
  xlight: string;
  light: string;
  medium: string;
  dark: string;
  xdark: string;
};

export type FontStack = {
  default: string;
  mono: string;
};

export type FontColor = {
  light: string;
  medium: string;
  dark: string; // default
  orange: string;
};

export type ZIndex = {
  default: number;
  absolute: number;
  drawer: number;
  select: number;
  input: number;
  popover: number;
  tooltip: number;
  header: number;
  backdrop: number;
  sidebar: number;
  modal: number;
};

export type FontWeight = {
  regular: string;
  bold: string;
  black: string;
};

export type ThemeProp = {
  colors: {
    primary: ColorGradation;
    secondary: ColorGradation;
    error: ColorGradation;
    success: ColorGradation;
    info: ColorGradation;
    warning: ColorGradation;
  };
  miscellaneous: Miscellaneous;
  spacings: Spacings;
  iconSizes: IconSizes;
  borderRadius: BorderRadius;
  borderWidth: BorderWidth;
  typography: Typography;
  font: {
    color: FontColor;
    stack: FontStack;
    weight: FontWeight;
  };
  zIndex: ZIndex;
};

export interface ThemeProviderProps {
  theme: ThemeProp;
}

export interface StyleProps {
  theme: ThemeProp;
}
