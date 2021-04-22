import React from 'react';
import { ThemeProvider as EmotionProvider } from '@emotion/react';

export type ThemeProp = {
  primary: { main: string; contrastText: string };
  secondary: { main: string; contrastText: string };
  error: { main: string; contrastText: string };
  success: { main: string; contrastText: string };
  info: { main: string; contrastText: string };
  warning: { main: string; contrastText: string };
  text: { main: string; contrast: string };
};

export interface ThemeProviderProps {
  children?: JSX.Element;
  theme: ThemeProp;
}

const ThemeProvider = (props: ThemeProviderProps): JSX.Element => {
  const { theme, children } = props;
  return <EmotionProvider theme={theme}>{children}</EmotionProvider>;
};

export default ThemeProvider;
