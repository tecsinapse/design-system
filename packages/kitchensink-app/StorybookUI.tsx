import styled from '@emotion/native';
import {
  lightTheme,
  StyleProps,
  Text,
  ThemeProvider,
} from '@tecsinapse/react-core/src';
import { ModalGroupManager } from '@tecsinapse/react-native-kit';
import React, { FC } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import pack from './package.json';
import StorybookUIRoot from './storybook';

export const StorybookUI: FC = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <Header>
        <Text typography="h4" fontWeight="bold" fontColor="light">
          TecSinapse KitchenSink
        </Text>
        <Text fontColor="light">version {pack.version}</Text>
      </Header>
      <SafeAreaProvider>
        <ModalGroupManager>
          <StorybookUIRoot />
        </ModalGroupManager>
      </SafeAreaProvider>
    </ThemeProvider>
  );
};

const Header = styled.View<Partial<StyleProps>>`
  background-color: ${({ theme }) => theme.color.primary.medium};
  padding: ${({ theme }) => theme.spacing.centi};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
