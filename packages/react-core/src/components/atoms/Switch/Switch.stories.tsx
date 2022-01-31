import React from 'react';
import { Story } from '@storybook/react';
import { SwitchProps, default as Switch } from './Switch';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Hybrid/Switch',
  component: Switch,
};

const Template: Story<SwitchProps> = args => {
  const [active, setActive] = React.useState(args.active);
  const onChange = arg => {
    setActive(!active);
    args.onChange(arg);
  };

  return <Switch active={active} onChange={onChange} disabled={args.disabled}/>;
};

export const Base = Template.bind({});

Base.args = {
  active: true,
  onChange: value => action('Cicked')(value),
  disabled: false,
};
