import React from 'react';
import { View } from 'react-native';

export const withView = Story => (
  <View
    style={{
      width: '100%',
      height: '100%',
      padding: 12,
    }}
  >
    <Story />
  </View>
);
