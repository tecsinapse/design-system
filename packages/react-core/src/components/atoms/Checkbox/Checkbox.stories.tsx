import React from 'react';
import { Story } from '@storybook/react';
import { default as CheckBox, CheckBoxProps } from './CheckBox';

export default {
  title: 'CheckBox',
  component: CheckBox,
};

const Template: Story<CheckBoxProps> = args => <CheckBox label={args.label} />;

export const Base = Template.bind({});

Base.args = {
  label: 'CheckBox',
};
