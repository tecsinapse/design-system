import React from 'react';
import { StoryFn } from '@storybook/react';
import Switch from './Switch';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Web/Switch',
  component: Switch,
};

const Template: StoryFn = args => {
  const [active, setActive] = React.useState(args.active);
  const onChange = arg => {
    setActive(!active);
    args.onChange(arg);
  };
  return (
    <Switch active={active} onChange={onChange} disabled={args.disabled} />
  );
};

export const Base = {
  render: Template,

  args: {
    active: true,
    onChange: value => action('Cicked')(value),
    disabled: false,
  },
};
