import React, { useState } from 'react';
import { StoryFn } from '@storybook/react';
import { TimeFieldInput, TimeValueType } from '../src';

export default {
  title: 'Cortex/TimeFieldInput',
  component: <div />,
};

const Template: StoryFn = () => {
  const [value, setValue] = useState<TimeValueType>();
  return <TimeFieldInput value={value} onChange={setValue} label={'teste'} />;
};

export const Base = {
  render: Template,
  args: {},
};
