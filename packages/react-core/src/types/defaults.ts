export type Color = {
  primary: ColorGradation;
  secondary: ColorGradation;
  error: ColorGradation;
  success: ColorGradation;
  info: ColorGradation;
  warning: ColorGradation;
};

export type TypographyVariation = {
  h1: Typography;
  h2: Typography;
  h3: Typography;
  h4: Typography;
  h5: Typography;
  base: Typography;
  sub: Typography;
  label: Typography;
};

export type Miscellaneous = {
  shadow: string;
  overlay: string;
  bodyColor: string;
  surfaceColor: string;
};

export type Spacing = {
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
  hexa: string;
};

export type IconSize = {
  centi: string;
  deca: string;
  kilo: string;
};

export type BorderRadius = {
  nano: string;
  micro: string;
  mili: string;
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
  color: Color;
  miscellaneous: Miscellaneous;
  spacing: Spacing;
  iconSize: IconSize;
  borderRadius: BorderRadius;
  borderWidth: BorderWidth;
  typography: TypographyVariation;
  font: {
    color: FontColor;
    stack: FontStack;
    weight: FontWeight;
    files: FontWeight;
  };
  zIndex: ZIndex;
};

export interface ThemeProviderProps {
  theme: ThemeProp;
}

export type StyleProps = ThemeProviderProps;

export type ColorType = keyof Color;

export type SpacingType = keyof Spacing;

export type TypographyVariationType = keyof TypographyVariation;

export type FontWeightType = keyof FontWeight;

export type VariantType = 'filled' | 'outlined' | 'text';

export type ColorGradationType = keyof ColorGradation;

export type FontColorType = keyof FontColor;

export type BorderRadiusType = keyof BorderRadius;

export type FontStackType = keyof FontStack;

export type IconSizeType = keyof IconSize;
