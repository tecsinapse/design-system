import { colors } from '../tokens/definitions';
import { getContrast } from 'polished';

export const updateThemeColors = (theme: Partial<typeof colors>): void => {
  const root = document.documentElement;

  Object.entries(theme).forEach(([colorName, colorShades]) => {
    if (!colorShades) return;
    Object.entries(colorShades).forEach(([shade, hexValue]) => {
      if (!hexValue) return;
      root.style.setProperty(`--color-${colorName}-${shade}`, hexValue);
      if (colorName === 'primary' && shade === 'medium') {
        if (getContrast(hexValue, '#fff') < 2.5) {
          root.style.setProperty('--color-light', '#000');
        } else {
          root.style.setProperty('--color-light', '#fff');
        }
      }
    });
  });
};
