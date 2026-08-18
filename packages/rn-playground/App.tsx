import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import './global.css';
import StorybookUIRoot from './.rnstorybook';
import {
  ThemeProvider,
  useTheme,
  type ThemeName,
} from '@tecsinapse/cortex-native/src/provider/ThemeProvider';

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
    <View style={styles.demo}>
      <Pressable style={styles.toggle} onPress={() => onChange(nextTheme)}>
        <Text className="text-content-high">
          theme={theme} · resolved={resolvedTheme} · tap to switch to {nextTheme}
        </Text>
      </Pressable>
      <View className="bg-primary-medium" style={styles.swatch} />
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
    paddingTop: 64,
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
