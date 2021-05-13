import React from 'react';
import { Story } from '@storybook/react';
import { Text, TextProps } from './index';

export default {
  title: 'Components/Text',
  component: Text,
};

const Template: Story<TextProps> = args => <Text>{args.children}</Text>;

export const Base = Template.bind({});

Base.args = {
  children: 'Text',
};
