import { ColorGradationType, ColorType } from './types';

export type { ColorGradationType, ColorType } from './types';

/** Static token background classes for a palette variant + tone. */
export const colorToneBg: Record<
  ColorType,
  Record<ColorGradationType, string>
> = {
  primary: {
    xlight: 'bg-primary-xlight',
    light: 'bg-primary-light',
    medium: 'bg-primary-medium',
    dark: 'bg-primary-dark',
    xdark: 'bg-primary-xdark',
  },
  secondary: {
    xlight: 'bg-secondary-xlight',
    light: 'bg-secondary-light',
    medium: 'bg-secondary-medium',
    dark: 'bg-secondary-dark',
    xdark: 'bg-secondary-xdark',
  },
  info: {
    xlight: 'bg-info-xlight',
    light: 'bg-info-light',
    medium: 'bg-info-medium',
    dark: 'bg-info-dark',
    xdark: 'bg-info-xdark',
  },
  success: {
    xlight: 'bg-success-xlight',
    light: 'bg-success-light',
    medium: 'bg-success-medium',
    dark: 'bg-success-dark',
    xdark: 'bg-success-xdark',
  },
  warning: {
    xlight: 'bg-warning-xlight',
    light: 'bg-warning-light',
    medium: 'bg-warning-medium',
    dark: 'bg-warning-dark',
    xdark: 'bg-warning-xdark',
  },
  error: {
    xlight: 'bg-error-xlight',
    light: 'bg-error-light',
    medium: 'bg-error-medium',
    dark: 'bg-error-dark',
    xdark: 'bg-error-xdark',
  },
};
