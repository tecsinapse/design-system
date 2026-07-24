import { colors } from '../tokens/definitions';
import { getContrast } from 'polished';

const updateThemeText = (
  _root: HTMLElement | ShadowRoot,
  colorName: string,
  shade: string,
  hexValue: string
) => {
  const root = _root instanceof ShadowRoot ? _root.host : _root;

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
  shadowRoot,
}: {
  theme: Partial<typeof colors>;
  updateText?: boolean;
  shadowRoot?: ShadowRoot | HTMLElement;
}): void => {
  const root = shadowRoot ?? document.documentElement;
  const styleTarget =
    root instanceof ShadowRoot ? (root.host as HTMLElement) : root;

  Object.entries(theme).forEach(([colorName, colorShades]) => {
    if (!colorShades) return;
    Object.entries(colorShades).forEach(([shade, hexValue]) => {
      if (!hexValue) return;
      styleTarget.style.setProperty(`--color-${colorName}-${shade}`, hexValue);
      if (updateText) updateThemeText(root, colorName, shade, hexValue);
    });
  });
};
