import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import './global.css';
import StorybookUIRoot from './.rnstorybook';
import {
  type ThemeName,
  ThemeProvider,
  useTheme,
} from '@tecsinapse/cortex-native';

const THEMES: ThemeName[] = ['light', 'dark', 'system'];

function ThemeDemo({
  theme,
  onChange,
}: {
  theme: ThemeName;
  onChange: (theme: ThemeName) => void;
}) {
  const { resolvedTheme } = useTheme();
  const nextTheme = THEMES[(THEMES.indexOf(theme) + 1) % THEMES.length];

  return (
    <View style={styles.demo} className={'bg-primary-medium'}>
      <Pressable style={styles.toggle} onPress={() => onChange(nextTheme)}>
        <Text className="text-content-high">
          theme={theme} · resolved={resolvedTheme} · tap to switch to{' '}
          {nextTheme}
        </Text>
      </Pressable>
    </View>
  );
}

export default function App() {
  const [theme, setTheme] = useState<ThemeName>('system');

  return (
    <ThemeProvider theme={theme}>
      <ThemeDemo theme={theme} onChange={setTheme} />
      <StorybookUIRoot />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  demo: {
    paddingHorizontal: 16,
    gap: 16,
  },
  toggle: {
    paddingVertical: 8,
  },
  swatch: {
    height: 48,
    borderRadius: 8,
  },
});
