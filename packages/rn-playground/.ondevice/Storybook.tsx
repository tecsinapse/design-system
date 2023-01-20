import React from 'react';
import { getStorybookUI } from '@storybook/react-native';
import './doctools';
import './storybook.requires';
import { useFonts } from 'expo-font';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {
  ModalGroupManager,
  ThemeProvider,
  Text,
  lightTheme,
  StyleProps,
} from '@tecsinapse/react-native-kit';
import styled from '@emotion/native';

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
      <SafeAreaView style={{ flex: 1, backgroundColor: '#f8f7f7' }}>
        <ThemeProvider theme={lightTheme}>
          <Header>
            <Text typography="h4" fontWeight="bold" fontColor="light">
              Design System Playground
            </Text>
          </Header>
          <_StorybookUIRoot />
          <ModalGroupManager />
        </ThemeProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const Header = styled.View<Partial<StyleProps>>`
  background-color: ${({ theme }) => theme.color.primary.medium};
  padding: ${({ theme }) => theme.spacing.centi};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export default StorybookUIRoot;
