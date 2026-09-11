import { useState } from 'react';

import './global.css';
import StorybookUIRoot from './.rnstorybook';
import { type ThemeName, ThemeProvider } from '@tecsinapse/cortex-native';

export default function App() {
  const [theme, setTheme] = useState<ThemeName>('system');

  return (
    <ThemeProvider theme={theme}>
      <StorybookUIRoot theme={theme} onChange={setTheme} />
    </ThemeProvider>
  );
}
