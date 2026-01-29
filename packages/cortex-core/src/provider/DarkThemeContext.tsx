import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

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
    document.documentElement.dataset.theme = theme;
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
