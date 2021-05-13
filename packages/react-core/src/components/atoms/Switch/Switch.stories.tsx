import React from 'react';
import { Story } from '@storybook/react';
import { SwitchProps, default as Switch } from './Switch';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Components/Switch',
  component: Switch,
};

const Template: Story<SwitchProps> = args => {
  const [active, setActive] = React.useState(args.active);
  const onChange = arg => {
    setActive(!active);
    args.onChange(arg);
  };

  return <Switch active={active} onChange={onChange} />;
};

export const Base = Template.bind({});

Base.args = {
  active: true,
  onChange: value => action('Cicked')(value),
};
