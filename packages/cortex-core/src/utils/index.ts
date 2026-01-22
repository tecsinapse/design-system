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

export const setDarkMode = () => {
  const style = document.documentElement.style;
  const isDark = style.getPropertyValue('--color-body') !== '#f8f7f7';

  if (!isDark) {
    style.setProperty('--color-body', '#1e1e1e');
  } else {
    style.setProperty('--color-body', '#f8f7f7');
  }
};
