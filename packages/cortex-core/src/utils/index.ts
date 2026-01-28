import { colors } from '../tokens/definitions';
import { getContrast } from 'polished';

const updateThemeText = (
  colorName: string,
  shade: string,
  hexValue: string
) => {
  const root = document.documentElement;

  if (colorName === 'primary' && shade === 'medium') {
    if (getContrast(hexValue, '#fff') < 2.5) {
      root.setAttribute('data-contrast', 'black');
    } else {
      root.setAttribute('data-contrast', 'white');
    }
  }
};

export const updateThemeColors = ({
  theme,
  updateText = false,
}: {
  theme: Partial<typeof colors>;
  updateText?: boolean;
}): void => {
  const root = document.documentElement;

  Object.entries(theme).forEach(([colorName, colorShades]) => {
    if (!colorShades) return;
    Object.entries(colorShades).forEach(([shade, hexValue]) => {
      if (!hexValue) return;
      root.style.setProperty(`--color-${colorName}-${shade}`, hexValue);
      if (updateText) updateThemeText(colorName, shade, hexValue);
    });
  });
};
