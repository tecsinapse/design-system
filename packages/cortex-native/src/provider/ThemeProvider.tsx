import { createContext, type ReactNode, useContext, useEffect, useMemo } from 'react';

import { Uniwind, useUniwind } from 'uniwind';

export type ThemeName = 'light' | 'dark' | 'system';

export type ThemeContextValue = {
  theme: ThemeName;
  resolvedTheme: string;
  setTheme: (theme: ThemeName) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export type ThemeProviderProps = {
  theme?: ThemeName;
  children: ReactNode;
};

export function ThemeProvider({ theme = 'system', children }: ThemeProviderProps) {
  const { theme: resolvedTheme } = useUniwind();

  useEffect(() => {
    Uniwind.setTheme(theme);
  }, [theme]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      resolvedTheme,
      setTheme: (nextTheme) => Uniwind.setTheme(nextTheme),
    }),
    [theme, resolvedTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
