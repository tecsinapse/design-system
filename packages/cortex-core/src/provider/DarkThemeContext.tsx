import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { colors, darkColors, textColor } from '../tokens/definitions';

type Theme = 'light' | 'dark';

interface DarkThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  isDark: boolean;
}

const DarkThemeContext = createContext<DarkThemeContextValue | null>(null);

export const DarkThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const style = document.documentElement.style;

    if (theme === 'dark') {
      style.setProperty('--color-body', darkColors.body);
      style.setProperty('--color-text-default', darkColors.text.default);
      style.setProperty('--color-surface-base', darkColors.surface.base);
      style.setProperty('--color-surface-raised', darkColors.surface.raised);
      style.setProperty('--color-surface-overlay', darkColors.surface.overlay);
      style.setProperty('--color-surface-inverse', darkColors.surface.inverse);
      style.setProperty('--color-content-high', darkColors.content.high);
      style.setProperty('--color-content-medium', darkColors.content.medium);
      style.setProperty('--color-content-low', darkColors.content.low);
      style.setProperty('--color-content-minimal', darkColors.content.minimal);
      style.setProperty('--color-content-inverse', darkColors.content.inverse);
    } else {
      style.setProperty('--color-body', colors.miscellaneous.body);
      style.setProperty('--color-text-default', textColor.default);
      style.setProperty('--color-surface-base', colors.surface.base);
      style.setProperty('--color-surface-raised', colors.surface.raised);
      style.setProperty('--color-surface-overlay', colors.surface.overlay);
      style.setProperty('--color-surface-inverse', colors.surface.inverse);
      style.setProperty('--color-content-high', colors.content.high);
      style.setProperty('--color-content-medium', colors.content.medium);
      style.setProperty('--color-content-low', colors.content.low);
      style.setProperty('--color-content-minimal', colors.content.minimal);
      style.setProperty('--color-content-inverse', colors.content.inverse);
    }
  }, [theme]);

  const toggleTheme = () => setTheme(t => (t === 'light' ? 'dark' : 'light'));

  const isDark = useMemo(() => theme === 'dark', [theme]);

  return (
    <DarkThemeContext.Provider value={{ theme, setTheme, toggleTheme, isDark }}>
      {children}
    </DarkThemeContext.Provider>
  );
};

export const useDarkTheme = () => {
  const ctx = useContext(DarkThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider');
  return ctx;
};
