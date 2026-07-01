import React from 'react';
import { ThemeProvider as EmotionProvider } from '@emotion/react';
import { ThemeProviderProps } from '../types/defaults';

const ThemeProvider = ({
  theme,
  children,
}: ThemeProviderProps): React.ReactElement => {
  return <EmotionProvider theme={theme}>{children}</EmotionProvider>;
};

export default ThemeProvider;
