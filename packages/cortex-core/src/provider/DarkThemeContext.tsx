import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

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
      style.setProperty('--color-body', '#1e1e1e');
      style.setProperty('--color-text-default', '#fff');
      style.setProperty('--color-surface-base', '#1e1e1e');
      style.setProperty('--color-surface-raised', '#252526');
      style.setProperty('--color-surface-overlay', '#2d2d30');
    } else {
      style.setProperty('--color-body', '#f8f7f7');
      style.setProperty('--color-text-default', '#000');
      style.setProperty('--color-surface-base', '#f8f7f7');
      style.setProperty('--color-surface-raised', '#fbfbfb');
      style.setProperty('--color-surface-overlay', '#ffffff');
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
