import React from 'react';
import { Story } from '@storybook/react';
import Icon, { IconProps } from './Icon';

export default {
  title: 'Components/Icon',
  component: Text,
};

const Template: Story<IconProps> = ({ name, type, size, color }) => (
  <Icon name={name} size={size} color={color} type={type} />
);

export const Base = Template.bind({});

Base.args = {
  name: 'rocket',
  type: 'font-awesome',
  size: 'deca',
  color: '#000',
};
