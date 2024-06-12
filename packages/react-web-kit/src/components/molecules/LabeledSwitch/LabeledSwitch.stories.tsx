import { action } from '@storybook/addon-actions';
import { StoryFn } from '@storybook/react';
import React from 'react';
import {
  default as LabeledSwitch,
  LabeledSwitchWebProps,
} from './LabeledSwitch';

export default {
  title: 'react-web-kit/LabeledSwitch',
  component: LabeledSwitch,
};

const Template: StoryFn<LabeledSwitchWebProps> = args => {
  const [active, setActive] = React.useState(args.active);
  const onChange = arg => {
    setActive(!active);
    args.onChange(arg);
  };

  return (
    <LabeledSwitch
      active={active}
      onChange={onChange}
      leftLabel={'teste'}
      disabled={args.disabled}
      pressableLabel={args.pressableLabel}
    />
  );
};

export const Base = {
  render: Template,

  args: {
    active: true,
    onChange: value => action('Clicked')(value),
    disabled: false,
    pressableLabel: true,
  },
};
