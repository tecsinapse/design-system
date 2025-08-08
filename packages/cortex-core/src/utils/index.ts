export interface ColorShade {
  xlight: string;
  light: string;
  medium: string;
  dark: string;
  xdark: string;
}

export interface ThemeColors {
  primary: ColorShade;
  secondary: ColorShade;
}

export const updateThemeColors = (theme: Partial<ThemeColors>): void => {
  const root = document.documentElement;

  Object.entries(theme).forEach(([colorName, colorShades]) => {
    if (!colorShades) return;
    Object.entries(colorShades).forEach(([shade, hexValue]) => {
      if (!hexValue) return;
      root.style.setProperty(`--color-${colorName}-${shade}`, hexValue);
    });
  });
};
