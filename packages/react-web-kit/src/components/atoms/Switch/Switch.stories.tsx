import React from 'react';
import { Story } from '@storybook/react';
import { Text, Card } from '@tecsinapse/react-web-kit';
import Switch from './Switch';
import { set } from 'husky';

export default {
  title: 'Web/Switch',
  component: Switch,
};

const Template: Story = args => {
  const [active, setActive] = React.useState(false);
  return <Switch onChange={setActive} active={active} />;
};

export const Base = Template.bind({});

Base.args = {};
