import { ColorGradationType, ColorType } from './types';

export type { ColorGradationType, ColorType } from './types';

/** Static token border-color classes for a palette variant + tone. */
export const colorToneBorder: Record<
  ColorType,
  Record<ColorGradationType, string>
> = {
  primary: {
    xlight: 'border-primary-xlight',
    light: 'border-primary-light',
    medium: 'border-primary-medium',
    dark: 'border-primary-dark',
    xdark: 'border-primary-xdark',
  },
  secondary: {
    xlight: 'border-secondary-xlight',
    light: 'border-secondary-light',
    medium: 'border-secondary-medium',
    dark: 'border-secondary-dark',
    xdark: 'border-secondary-xdark',
  },
  info: {
    xlight: 'border-info-xlight',
    light: 'border-info-light',
    medium: 'border-info-medium',
    dark: 'border-info-dark',
    xdark: 'border-info-xdark',
  },
  success: {
    xlight: 'border-success-xlight',
    light: 'border-success-light',
    medium: 'border-success-medium',
    dark: 'border-success-dark',
    xdark: 'border-success-xdark',
  },
  warning: {
    xlight: 'border-warning-xlight',
    light: 'border-warning-light',
    medium: 'border-warning-medium',
    dark: 'border-warning-dark',
    xdark: 'border-warning-xdark',
  },
  error: {
    xlight: 'border-error-xlight',
    light: 'border-error-light',
    medium: 'border-error-medium',
    dark: 'border-error-dark',
    xdark: 'border-error-xdark',
  },
};

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
