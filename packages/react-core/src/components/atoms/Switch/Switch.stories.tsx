import React from 'react';
import { Story } from '@storybook/react';
import { SwitchProps, default as Switch } from './Switch';

export default {
  title: 'Switch',
  component: Switch,
};

const Template: Story<SwitchProps> = args => {
  const [active, setActive] = React.useState(false);
  return <Switch labels={args.labels} active={active} onChange={setActive} />;
};

export const Base = Template.bind({});

Base.args = {
  labels: {
    left: 'Left',
    right: 'Right',
  },
};
