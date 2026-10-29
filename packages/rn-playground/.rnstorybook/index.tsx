import React from 'react';
import { Pressable, View } from 'react-native';
import { view } from './storybook.requires';
import { useFonts } from 'expo-font';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {
  Icon,
  ModalGroupManager,
  Text,
  type ThemeName,
} from '@tecsinapse/cortex-native';

const _StorybookUIRoot = view.getStorybookUI({
  storage: {
    getItem: require('@react-native-async-storage/async-storage').default
      .getItem,
    setItem: require('@react-native-async-storage/async-storage').default
      .setItem,
  },
});

const THEMES: ThemeName[] = ['light', 'dark'];

const StorybookUIRoot = ({
  theme,
  onChange,
}: {
  theme: ThemeName;
  onChange: (theme: ThemeName) => void;
}) => {
  const [fontsLoaded] = useFonts({
    FontAwesome: require('../assets/fonts/FontAwesome.ttf'),
    FontAwesome5_Regular: require('../assets/fonts/FontAwesome5_Regular.ttf'),
    FontAwesome5_Solid: require('../assets/fonts/FontAwesome5_Solid.ttf'),
    FontAwesome5_Brands: require('../assets/fonts/FontAwesome5_Brands.ttf'),
    MaterialIcons: require('../assets/fonts/MaterialIcons.ttf'),
    MaterialCommunityIcons: require('../assets/fonts/MaterialCommunityIcons.ttf'),
    Ionicons: require('../assets/fonts/Ionicons.ttf'),
    Fontisto: require('../assets/fonts/Fontisto.ttf'),
    'Lato-Black': require('../assets/fonts/Lato-Black.ttf'),
    'Lato-Bold': require('../assets/fonts/Lato-Bold.ttf'),
    'Lato-Regular': require('../assets/fonts/Lato-Regular.ttf'),
  });

  const nextTheme = THEMES[(THEMES.indexOf(theme) + 1) % THEMES.length];

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View className="flex-1 bg-linear-to-b from-primary-medium to-content-minimal">
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <View className="flex-row items-center justify-between bg-primary-medium p-centi">
            <Text typography="h4" fontWeight="bold" fontColor="light">
              Design System Playground
            </Text>
            <Pressable
              className="items-center justify-center rounded-mili bg-content-inverse p-centi"
              onPress={() => onChange(nextTheme)}
            >
              <Text typography="sub">Theme</Text>
              <Icon type="font-awesome" name="exchange" />
            </Pressable>
          </View>
          <_StorybookUIRoot />
          <ModalGroupManager />
        </SafeAreaView>
      </SafeAreaProvider>
    </View>
  );
};

export default StorybookUIRoot;
