import { getStorybookUI } from '@storybook/react-native';
import './doctools';
import './storybook.requires';
import { useFonts } from 'expo-font';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React from 'react';

const _StorybookUIRoot = getStorybookUI({});

const StorybookUIRoot = () => {
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

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <_StorybookUIRoot />
    </SafeAreaProvider>
  );
};
export default StorybookUIRoot;
