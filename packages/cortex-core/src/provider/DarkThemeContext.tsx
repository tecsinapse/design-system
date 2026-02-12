import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useCallback } from 'storybook/internal/preview-api';

export type Theme = 'light' | 'dark';

interface DarkThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => Theme;
  isDark: boolean;
  systemTheme: Theme;
}

const DarkThemeContext = createContext<DarkThemeContextValue | null>(null);

export const DarkThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggleTheme = useCallback(() => {
    const next: Theme = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    return next;
  }, [theme]);

  const isDark = useMemo(() => theme === 'dark', [theme]);

  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';

  return (
    <DarkThemeContext.Provider
      value={{ theme, setTheme, toggleTheme, isDark, systemTheme }}
    >
      {children}
    </DarkThemeContext.Provider>
  );
};

export const useDarkTheme = () => {
  const ctx = useContext(DarkThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider');
  return ctx;
};
