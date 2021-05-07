import React from 'react';
import { Story } from '@storybook/react';
import { default as Checkbox, CheckboxProps } from './Checkbox';

export default {
  title: 'Checkbox',
  component: Checkbox,
};

const Template: Story<CheckboxProps> = ({ label }: CheckboxProps) => (
  <Checkbox label={label} />
);

export const Base = Template.bind({});

Base.args = {
  label: 'Checkbox',
};
