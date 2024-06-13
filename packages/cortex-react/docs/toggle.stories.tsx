import React, { useState } from 'react';
import { StoryFn } from '@storybook/react';
import { Toggle } from '../src';

export default {
  title: 'Cortex/Toggle',
  component: Toggle,
};

const Template: StoryFn = () => {
  const [checked, setChecked] = useState(false);
  return <Toggle checked={checked} onClick={() => setChecked(!checked)} />;
};

export const Base = {
  render: Template,
  args: {},
};
