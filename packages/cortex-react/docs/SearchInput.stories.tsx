import React from 'react';
import { StoryFn } from '@storybook/react';
import { Input } from '../src';
import SearchInput from '../src/components/SearchInput';

export default {
  title: 'Cortex/Input/Search',
  component: Input,
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
    intent: 'default',
  },
  argTypes: {
    intent: {
      options: ['default', 'success', 'warning', 'error'],
      control: { type: 'select' },
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
  return (
    <div className={'flex flex-col gap-y-mili'}>
      <p className={'text-sub'}>Search Input</p>
      <SearchInput label={args.label} placeholder={args.placeholder} />
      <p className={'mt-mili text-sub'}>Search Input with onClick</p>
      <SearchInput
        label={args.label}
        placeholder={args.placeholder}
        onClick={() => undefined}
      />
    </div>
  );
};

export const Base = {
  render: Template,
  args: {},
};
