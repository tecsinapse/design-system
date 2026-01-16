import { colors } from '../tokens/definitions';
import { getContrast, readableColor } from 'polished';

export const updateThemeColors = (theme: Partial<typeof colors>): void => {
  const root = document.documentElement;

  Object.entries(theme).forEach(([colorName, colorShades]) => {
    if (!colorShades) return;
    Object.entries(colorShades).forEach(([shade, hexValue]) => {
      if (!hexValue) return;
      root.style.setProperty(`--color-${colorName}-${shade}`, hexValue);
      (shade !== 'xlight' &&
        shade !== 'xdark' &&
        getContrast(
          root.style.getPropertyValue(`--color-text-${shade}`),
          hexValue
        ) < 4.5) ??
        root.style.setProperty(
          `--color-text-${shade}`,
          readableColor(hexValue)
        );
    });
  });
};
