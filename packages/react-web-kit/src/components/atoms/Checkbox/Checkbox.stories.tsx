import React from 'react';
import { Story } from '@storybook/react';
import { default as Checkbox, CheckboxProps } from './Checkbox';
import { Text } from '@tecsinapse/react-core';

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
};

const Template: Story<CheckboxProps> = ({ labelPosition }) => (
  <Checkbox labelPosition={labelPosition}>
    <Text>CheckBox</Text>
  </Checkbox>
);

export const Base = Template.bind({});

Base.args = {
  labelPosition: 'right',
};
