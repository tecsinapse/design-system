import React, { useState } from 'react';
import { StoryFn } from '@storybook/react';
import { Select } from '../index';

export default {
  title: 'Cortex-React/Select',
  component: <div />,
  argTypes: {
    intent: {
      options: ['primary', 'secondary', 'success', 'info', 'warning', 'error'],
      control: { type: 'select' },
    },
    variant: {
      options: ['outline', 'text', 'filled'],
      control: { type: 'select' },
    },
    size: {
      options: ['small', 'default', 'circle', 'square'],
      control: { type: 'select' },
    },
  },
};

const options = [
  { key: '1', label: 'São paulo' },
  { key: '2', label: 'Rio de Janeiro' },
  { key: '3', label: 'Campo Grande' },
  { key: '4', label: 'Goiania' },
  { key: '5', label: 'Uberlândia' },
  { key: '6', label: 'Salvador' },
  { key: '7', label: 'São Luis' },
  { key: '7', label: 'Manaus' },
  { key: '8', label: 'Rio Branco' },
];

const Template: StoryFn = () => {
  const [value, setValue] = useState<{ key: string; label: string }>();
  return (
    <div className={'w-[250px]'}>
      <Select
        keyExtractor={op => op.key}
        label={'Label'}
        labelExtractor={op => op.label}
        onSelect={setValue}
        value={value}
        options={options}
      />
    </div>
  );
};

export const Base = {
  render: Template,
  args: {},
};
