import { StoryFn } from '@storybook/react';
import React, { useState } from 'react';
import { Select } from '../src';
import SearchInput from '../src/components/SearchInput';

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
  { key: '8', label: 'Manaus' },
  { key: '9', label: 'Rio Branco' },
];

type Option = { key: string; label: string };
const Template: StoryFn = args => {
  const [value, setValue] = useState<{ key: string; label: string }>();
  const [options, setOptions] = useState<Option[]>(_options);

  const handleSearch = React.useCallback((searchArg: string) => {
    setOptions(
      options.filter(item =>
        new RegExp(searchArg, 'ig').test(item.label)
      )
    );
  }, []);

  return (
    <div className={'w-[350px]'}>
      <Select.Root 
        value={value} 
        labelExtractor={op => op.label} 
        keyExtractor={op => op.key}
      >
        <Select.Trigger label={args.label} />
        <Select.Popover>
          <SearchInput className={'px-deca'} onChange={handleSearch} placeholder={args.placeholderSearchInput} />
          <Select.Options 
            options={options} 
            onSelect={setValue}
          />
        </Select.Popover>
      </Select.Root>
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
