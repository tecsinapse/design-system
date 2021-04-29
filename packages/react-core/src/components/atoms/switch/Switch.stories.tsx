import React from 'react';
import { Story } from '@storybook/react';
import { SwitchProps, Switch } from './Switch';

export default {
  title: 'Badge',
  component: Switch,
};

const Template: Story<SwitchProps> = args => <Switch labels={args.labels} />;

export const Base = Template.bind({});

Base.args = {
  labels: {
    left: 'Left',
    right: 'Right',
  },
};
