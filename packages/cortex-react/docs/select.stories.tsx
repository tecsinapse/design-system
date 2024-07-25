import { Meta } from '@storybook/react';
import React, { useState } from 'react';
import { Input, Select } from '../src';
import { Option, _options, map } from './selectMocks';

export default {
  title: 'Cortex/Select',
  component: Select.Root,
  subcomponents: {
    Trigger: Select.Trigger,
    Options: Select.Options,
    GroupedOptions: Select.GroupedOptions,
    MultiOptions: Select.MultiOptions,
    MultiGroupedOptions: Select.MultiGroupedOptions,
  },
} as Meta<typeof Select.Root>;

export const Default = {
  args: {
    variant: {
      intent: 'default',
    },
    label: 'Label',
    placeholderSearchInput: 'Placeholder Search',
  },
  render: args => {
    const [value, setValue] = useState<Option>();
    const [options, setOptions] = useState<Option[]>(_options);

    const handleSearch = React.useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchArg = event.target.value;
        setOptions(
          _options.filter(item => new RegExp(searchArg, 'ig').test(item.label))
        );
      },
      []
    );

    return (
      <div className={'w-[350px] h-[450px]'}>
        <Select.Root
          value={value}
          labelExtractor={op => op.label}
          keyExtractor={op => op.key}
        >
          <Select.Trigger label={args.label} />
          <Select.Popover>
            <Input.Search
              variants={{
                className: 'flex-1 mx-deca mt-centi',
              }}
              onChange={handleSearch}
              placeholder={args.placeholderSearchInput}
            />
            <Select.Options
              options={options}
              onSelect={option => setValue(option)}
            />
          </Select.Popover>
        </Select.Root>
      </div>
    );
  },
};

export const Grouped = {
  args: {
    variant: {
      intent: 'default',
    },
    label: 'Label',
    placeholderSearchInput: 'Placeholder Search',
  },
  render: args => {
    const [value, setValue] = useState<{ key: string; label: string }>();
    const [options, setOptions] = useState(map);

    const handleSearch = React.useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchArg = event.target.value;

        const newMap = new Map();
        Array.from(map.entries()).forEach(([key, items]) => {
          const itemsFiltered = items.filter(item => {
            return new RegExp(searchArg, 'ig').test(item.label);
          });
          if (itemsFiltered.length) newMap.set(key, itemsFiltered);
        });
        setOptions(newMap);
      },
      [options]
    );

    return (
      <div className={'w-[350px] h-[450px]'}>
        <Select.Root
          value={value}
          labelExtractor={op => op.label}
          keyExtractor={op => op.key}
        >
          <Select.Trigger label={args.label} />
          <Select.Popover>
            <Input.Search
              onChange={handleSearch}
              placeholder={args.placeholderSearchInput}
              variants={{
                className: 'flex-1 mx-deca mt-centi',
              }}
            />
            <Select.GroupedOptions
              groupedLabelExtractor={labelGroup => labelGroup}
              options={options}
              onSelect={option => setValue(option)}
            />
          </Select.Popover>
        </Select.Root>
      </div>
    );
  },
};

export const Multi = {
  args: {
    variant: {
      intent: 'default',
    },
    label: 'Label',
    placeholderSearchInput: 'Placeholder Search',
  },
  render: args => {
    const [value, setValue] = useState<Option[]>([]);
    const [options, setOptions] = useState<Option[]>(_options);

    const handleSearch = React.useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchArg = event.target.value;
        setOptions(
          _options.filter(item => new RegExp(searchArg, 'ig').test(item.label))
        );
      },
      []
    );

    return (
      <div className={'w-[350px] h-[450px]'}>
        <Select.Root
          value={value}
          labelExtractor={op => op.label}
          keyExtractor={op => op.key}
        >
          <Select.Trigger label={args.label} />
          <Select.Popover>
            <Input.Search
              variants={{
                className: 'flex-1 mx-deca mt-centi',
              }}
              onChange={handleSearch}
              placeholder={args.placeholderSearchInput}
            />
            <Select.MultiOptions
              options={options}
              onSelect={option => setValue(option)}
            >
              <Select.MultiCheckAllOptions />
            </Select.MultiOptions>
          </Select.Popover>
        </Select.Root>
      </div>
    );
  },
};

export const MultiGrouped = {
  args: {
    variant: {
      intent: 'default',
    },
    label: 'Label',
    placeholderSearchInput: 'Placeholder Search',
  },
  render: args => {
    const [value, setValue] = useState<{ key: string; label: string }[]>([]);
    const [options, setOptions] = useState(map);

    const handleSearch = React.useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchArg = event.target.value;

        const newMap = new Map();
        Array.from(map.entries()).forEach(([key, items]) => {
          const itemsFiltered = items.filter(item => {
            return new RegExp(searchArg, 'ig').test(item.label);
          });
          if (itemsFiltered.length) newMap.set(key, itemsFiltered);
        });
        setOptions(newMap);
      },
      [options]
    );

    return (
      <div className={'w-[350px] h-[450px]'}>
        <Select.Root
          value={value}
          labelExtractor={op => op.label}
          keyExtractor={op => op.key}
        >
          <Select.Trigger label={args.label} />
          <Select.Popover>
            <Input.Search
              variants={{
                className: 'flex-1 mx-deca mt-centi',
              }}
              onChange={handleSearch}
              placeholder={args.placeholderSearchInput}
            />
            <Select.MultiGroupedOptions
              groupedLabelExtractor={labelGroup => labelGroup}
              options={options}
              onSelect={option => setValue(option)}
            >
              <Select.MultiCheckAllOptions />
            </Select.MultiGroupedOptions>
          </Select.Popover>
        </Select.Root>
      </div>
    );
  },
};
