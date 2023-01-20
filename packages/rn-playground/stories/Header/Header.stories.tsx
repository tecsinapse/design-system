import { Header } from '@tecsinapse/react-native-kit';
import React from 'react';
import { ComponentMeta } from '@storybook/react-native';

const StoryMeta: ComponentMeta<typeof Header> = {
  title: 'Header',
  component: Header,
};

export default StoryMeta;

export const Base = () => {
  return (
    <Header
      leftButton={{
        icon: {
          name: 'search-outline',
          type: 'ionicon',
          fontColor: 'light',
        },
      }}
      rightButton={{
        icon: {
          name: 'search-outline',
          type: 'ionicon',
          fontColor: 'light',
        },
      }}
    />
  );
};
