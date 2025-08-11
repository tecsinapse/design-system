import { colors } from '../tokens/definitions';

export const updateThemeColors = (theme: Partial<typeof colors>): void => {
  const root = document.documentElement;

  Object.entries(theme).forEach(([colorName, colorShades]) => {
    if (!colorShades) return;
    Object.entries(colorShades).forEach(([shade, hexValue]) => {
      if (!hexValue) return;
      root.style.setProperty(`--color-${colorName}-${shade}`, hexValue);
    });
  });
};
