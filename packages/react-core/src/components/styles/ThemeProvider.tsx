import React from 'react';
import {
  ThemeProvider as EmotionProvider,
  ThemeProviderProps,
} from '@emotion/react';

const ThemeProvider = (props: ThemeProviderProps): JSX.Element => {
  const { theme, children } = props;
  return <EmotionProvider theme={theme}>{children}</EmotionProvider>;
};

export default ThemeProvider;
