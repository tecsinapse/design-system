import React from 'react';
import { Story } from '@storybook/react';
import { default as Checkbox, CheckboxProps } from './Checkbox';
import { Text } from '../../../index';

export default {
  title: 'Checkbox',
  component: Checkbox,
};

const Template: Story<CheckboxProps> = () => (
  <Checkbox>
    <Text>CheckBox</Text>
  </Checkbox>
);

export const Base = Template.bind({});

Base.args = {};
