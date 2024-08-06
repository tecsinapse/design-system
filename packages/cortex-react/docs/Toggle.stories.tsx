import { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Toggle } from '../src';

export default {
  title: 'Cortex/Toggle',
  component: Toggle,
} as Meta<typeof Toggle>;

export const Default: StoryObj<typeof Toggle> = {
  render: () => {
    const [checked, setChecked] = useState(true);
    return <Toggle checked={checked} onClick={() => setChecked(!checked)} />;
  },
};
