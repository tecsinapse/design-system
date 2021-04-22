import React from 'react';
import { Story } from '@storybook/react';
import Text, { TextProps } from './Text';
import ThemeProvider from '../../styles/ThemeProvider';

export default {
  title: 'Text',
  component: Text,
};

const theme = {
  color: 'black',
  backgroundColor: 'blue',
};

const Template: Story<TextProps> = args => (
  <ThemeProvider theme={theme}>
    <Text>{args.children}</Text>
  </ThemeProvider>
);

export const Base = Template.bind({});

Base.args = {
  children: 'Button',
};
