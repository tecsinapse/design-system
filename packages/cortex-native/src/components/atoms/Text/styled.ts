import { tv, type VariantProps } from 'tailwind-variants';

export type ColorType =
  | 'primary'
  | 'secondary'
  | 'info'
  | 'success'
  | 'warning'
  | 'error';

export type ColorGradationType = 'xlight' | 'light' | 'medium' | 'dark' | 'xdark';

export type FontColorType =
  | 'high'
  | 'medium'
  | 'low'
  | 'minimal'
  | 'inverse'
  | 'light'
  | 'orange';

export const textStyles = tv({
  base: '',
  variants: {
    typography: {
      h1: 'text-h1 leading-h1',
      h2: 'text-h2 leading-h2',
      h3: 'text-h3 leading-h3',
      h4: 'text-h4 leading-h4',
      h5: 'text-h5 leading-h5',
      base: 'text-base leading-base',
      sub: 'text-sub leading-sub',
      label: 'text-label leading-label',
    },
    fontWeight: {
      thin: 'font-thin',
      light: 'font-light',
      regular: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
      extrabold: 'font-extrabold',
      black: 'font-black',
    },
    fontStack: {
      default: 'font-sans',
      mono: 'font-mono',
    },
    colorVariant: {
      primary: 'text-primary-medium',
      secondary: 'text-secondary-medium',
      info: 'text-info-medium',
      success: 'text-success-medium',
      warning: 'text-warning-medium',
      error: 'text-error-medium',
    },
  },
  defaultVariants: { typography: 'base', fontWeight: 'regular' },
});

export type TextStylesVariants = VariantProps<typeof textStyles>;

export const fontColorStyles: Record<FontColorType, string> = {
  high: 'text-content-high',
  medium: 'text-content-medium',
  low: 'text-content-low',
  minimal: 'text-content-minimal',
  inverse: 'text-content-inverse',
  light: 'text-light',
  orange: 'text-orange',
};

export const colorToneStyles: Record<
  ColorType,
  Record<ColorGradationType, string>
> = {
  primary: {
    xlight: 'text-primary-xlight',
    light: 'text-primary-light',
    medium: 'text-primary-medium',
    dark: 'text-primary-dark',
    xdark: 'text-primary-xdark',
  },
  secondary: {
    xlight: 'text-secondary-xlight',
    light: 'text-secondary-light',
    medium: 'text-secondary-medium',
    dark: 'text-secondary-dark',
    xdark: 'text-secondary-xdark',
  },
  info: {
    xlight: 'text-info-xlight',
    light: 'text-info-light',
    medium: 'text-info-medium',
    dark: 'text-info-dark',
    xdark: 'text-info-xdark',
  },
  success: {
    xlight: 'text-success-xlight',
    light: 'text-success-light',
    medium: 'text-success-medium',
    dark: 'text-success-dark',
    xdark: 'text-success-xdark',
  },
  warning: {
    xlight: 'text-warning-xlight',
    light: 'text-warning-light',
    medium: 'text-warning-medium',
    dark: 'text-warning-dark',
    xdark: 'text-warning-xdark',
  },
  error: {
    xlight: 'text-error-xlight',
    light: 'text-error-light',
    medium: 'text-error-medium',
    dark: 'text-error-dark',
    xdark: 'text-error-xdark',
  },
};
