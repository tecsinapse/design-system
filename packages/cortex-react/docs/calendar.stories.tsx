import { StoryFn } from '@storybook/react';
import React, { useState } from 'react';
import { Calendar } from '../src';

export default {
  title: 'Cortex/Calendar',
  component: Calendar,
};

const Template: StoryFn = args => {
  const [value, setValue] = useState(new Date())

  return (
    <>
      <Calendar value={value} onChange={(date) => setValue(date)}/>
      <p>Data selecionada</p>
      <span>{value.toISOString()}</span>
    </>
  );
};

export const Base = {
  render: Template,
  args: {},
};
