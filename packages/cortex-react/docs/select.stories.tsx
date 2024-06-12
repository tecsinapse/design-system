import React, { useState } from 'react';
import { StoryFn } from '@storybook/react';
import { Select } from '../src';

export default {
  title: 'Cortex/Select',
  component: Select,
  argTypes: {
    variant: {
      options: ['default', 'error'],
      control: { type: 'select' },
    },
    label: {
      control: { type: 'text' },
    },
    placeholderSearchInput: {
      control: { type: 'text' },
    },
  },
};

const _options = [
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

type Option = { key: string; label: string };
const Template: StoryFn = args => {
  const [value, setValue] = useState<{ key: string; label: string }>();
  const [options, setOptions] = useState<Option[]>(_options);

  const handleSearch = React.useCallback((searchArg: string) => {
    setOptions(
      (options as Option[]).filter(item =>
        new RegExp(searchArg, 'ig').test(item.label)
      )
    );
  }, []);
  return (
    <div className={'w-[350px]'}>
      <Select
        variant={args.variant}
        keyExtractor={op => op.key}
        label={args.label}
        onSearch={handleSearch}
        placeholderSearchInput={args.placeholderSearchInput}
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
  args: {
    variant: 'default',
    label: 'Label',
    placeholderSearchInput: 'Placeholder Search',
  },
};
