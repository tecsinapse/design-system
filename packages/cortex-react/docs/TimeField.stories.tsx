import React, { useState } from 'react';
import { StoryFn } from '@storybook/react';
import { TimeFieldInput, TimeValueT } from '../src';

export default {
  title: 'Cortex/Calendar/TimeFieldInput',
  component: <div />,
};

const Template: StoryFn = () => {
  const [value, setValue] = useState<TimeValueT>();
  console.log(value, ' VALUE');
  return <TimeFieldInput value={value} onChange={setValue} label={'teste'} />;
};

export const Base = {
  render: Template,
  args: {},
};
