import React, { useState } from 'react';
import { StoryFn } from '@storybook/react';
import { TextArea } from '../index';

export default {
  title: 'Cortex-React/TextArea',
  component: <div />,
  args: {
    rows: 6,
    intent: 'default',
    label: 'Label',
    placeholder: 'placeholder',
  },
  argTypes: {
    intent: {
      options: ['default', 'success', 'warning', 'error'],
      control: { type: 'select' },
    },
    rows: {
      control: { type: 'number' },
    },
    label: {
      control: { type: 'text' },
    },
    placeholder: {
      control: { type: 'text' },
    },
  },
};

const Template: StoryFn = args => {
  const [value, setValue] = useState('');
  return (
    <div className={'w-[300px]'}>
      <TextArea.Root
        placeholder={args.placeholder}
        label={args.label}
        variants={{ intent: args.intent }}
        rows={args.rows}
        value={value}
        onChange={e => setValue(e.currentTarget.value)}
      />
    </div>
  );
};

export const Base = {
  render: Template,
  args: {},
};
