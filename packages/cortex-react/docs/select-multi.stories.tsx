import { StoryFn } from '@storybook/react';
import { checkbox } from '@tecsinapse/cortex-core';
import React, { ChangeEvent, useCallback, useState } from 'react';
import { Input, Select } from '../src';

export default {
  title: 'Cortex/Select/Multi',
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
  const [value, setValue] = useState<Option[]>([]);
  const [options, setOptions] = useState<Option[]>(_options);

  const handleSearch = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const searchArg = event.target.value;
    setOptions(
      _options.filter(item =>
        new RegExp(searchArg, 'ig').test(item.label)
      )
    );
  }, []);

  const checkAll = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    {
        if(!e.target?.checked)
            setValue([])
        else 
            setValue(_options)
    }
  }, [])

  return (
    <div className={'w-[350px] h-[250px]'}>
      <Select.Root 
        value={value} 
        labelExtractor={op => op.label} 
        keyExtractor={op => op.key}
      >
        <Select.Trigger label={args.label} />
        <Select.Popover>
            <div className='flex flex-row items-center gap-x-deca px-deca'>
                <input
                    type='checkbox' 
                    className={checkbox()}
                    onChange={checkAll}
                    checked={_options.length === value.length}
                />
                <Input.Search 
                    className={'flex-1'} 
                    onChange={handleSearch} 
                    placeholder={args.placeholderSearchInput} 
                />
            </div>
          <Select.MultiOptions 
            options={options} 
            onSelect={(option) => setValue(option)}
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
