import { action } from '@storybook/addon-actions';
import { Story } from '@storybook/react';
import React from 'react';
import {
  default as LabeledSwitch,
  LabeledSwitchWebProps,
} from './LabeledSwitch';

export default {
  title: 'Web/LabeledSwitch',
  component: LabeledSwitch,
};

const Template: Story<LabeledSwitchWebProps> = args => {
  const [active, setActive] = React.useState(args.active);
  const onChange = arg => {
    setActive(!active);
    args.onChange(arg);
  };

  return (
    <LabeledSwitch
      active={active}
      onChange={onChange}
      disabled={args.disabled}
      label={'Labeled switch!'}
      labelPosition={args.labelPosition}
      pressableLabel={args.pressableLabel}
    />
  );
};

export const Base = Template.bind({});

Base.args = {
  active: true,
  onChange: value => action('Clicked')(value),
  disabled: false,
  labelPosition: 'right',
  pressableLabel: true,
};
