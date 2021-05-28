import React from 'react';
import { Story } from '@storybook/react';
import Icon, { IconProps } from './Icon';

export default {
  title: 'Components/Icon',
  component: Icon,
};

const Template: Story<IconProps> = ({ name, type, size, ...args }) => (
  <Icon {...args} name={name} size={size} type={type} />
);

export const Base = Template.bind({});

Base.args = {
  name: 'rocket',
  type: 'font-awesome',
  size: 'kilo',
  fontColor: 'dark',
};
