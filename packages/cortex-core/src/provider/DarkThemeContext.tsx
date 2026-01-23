import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { colors, darkColors, textColor } from '../tokens/definitions';

type Theme = 'light' | 'dark';

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const style = document.documentElement.style;

    if (theme === 'dark') {
      style.setProperty('--color-body', darkColors.body);
      style.setProperty('--color-text-default', darkColors.text.default);
      style.setProperty('--color-surface-base', darkColors.surface.base);
      style.setProperty('--color-surface-raised', darkColors.surface.raised);
      style.setProperty('--color-surface-overlay', darkColors.surface.overlay);
      style.setProperty('--color-content-primary', darkColors.content.primary);
      style.setProperty(
        '--color-content-secondary',
        darkColors.content.secondary
      );
      style.setProperty(
        '--color-content-tertiary',
        darkColors.content.tertiary
      );
      style.setProperty(
        '--color-content-disabled',
        darkColors.content.disabled
      );
      style.setProperty('--color-content-inverse', darkColors.content.inverse);
    } else {
      style.setProperty('--color-body', colors.miscellaneous.body);
      style.setProperty('--color-text-default', textColor.default);
      style.setProperty('--color-surface-base', colors.surface.base);
      style.setProperty('--color-surface-raised', colors.surface.raised);
      style.setProperty('--color-surface-overlay', colors.surface.overlay);
      style.setProperty('--color-content-primary', colors.content.primary);
      style.setProperty('--color-content-secondary', colors.content.secondary);
      style.setProperty('--color-content-tertiary', colors.content.tertiary);
      style.setProperty('--color-content-disabled', colors.content.disabled);
      style.setProperty('--color-content-inverse', colors.content.inverse);
    }
  }, [theme]);

  const toggleTheme = () => setTheme(t => (t === 'light' ? 'dark' : 'light'));

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useDarkTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider');
  return ctx;
};
