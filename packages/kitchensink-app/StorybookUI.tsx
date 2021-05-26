import styled from '@emotion/native';
import {
  lightTheme,
  StyleProps,
  Text,
  ThemeProvider,
} from '@tecsinapse/react-core/src';
import React, { FC } from 'react';
import pack from './package.json';
import StorybookUIRoot from './storybook';

export const StorybookUI: FC = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <Header>
        <Text typography="h4" fontWeight="bold" colorVariant="light">
          TecSinapse KitchenSink
        </Text>
        <Text colorVariant="light">version {pack.version}</Text>
      </Header>
      <StorybookUIRoot />
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
