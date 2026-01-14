import { Meta, StoryObj } from '@storybook/react';
import React, { useCallback, useMemo, useState } from 'react';
import { groupedOptions, selectOptions } from './autocompleteMocks';
import { Autocomplete } from '../src';
import { Option } from '../src/components/Autocomplete/types';

export default {
  title: 'Cortex/Autocomplete',
  component: Autocomplete.Root,
  subcomponents: {
    Trigger: Autocomplete.Trigger,
    Popover: Autocomplete.Popover,
    Options: Autocomplete.Options,
    Option: Autocomplete.Option,
  },
} as Meta<typeof Autocomplete.Root>;

export const Default: StoryObj<typeof Autocomplete> = {
  render: () => {
    const [value, setValue] = useState('');

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;

      setValue(value);
    };

    const filteredOptions = useMemo(() => {
      const optionsList = (selectOptions ?? []).filter(op =>
        op.label.toLowerCase().includes(value.toLowerCase())
      );
      return optionsList;
    }, [value]);

    return (
      <div className="flex items-center h-[200px] w-[400px]">
        <Autocomplete.Root>
          <Autocomplete.Trigger inputValue={value} onChange={onChange} />
          <Autocomplete.Popover>
            <Autocomplete.Options options={filteredOptions} />
          </Autocomplete.Popover>
        </Autocomplete.Root>
      </div>
    );
  },
};

export const CustomOptions: StoryObj<typeof Autocomplete> = {
  render: () => {
    const [value, setValue] = useState('');

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;

      setValue(value);
    };

    const filteredOptions = useMemo(() => {
      const optionsList = (selectOptions ?? []).filter(op =>
        op.label.toLowerCase().includes(value.toLowerCase())
      );
      return optionsList;
    }, [value]);

    return (
      <div className="flex items-center h-[200px] w-[400px]">
        <Autocomplete.Root>
          <Autocomplete.Trigger inputValue={value} onChange={onChange} />
          <Autocomplete.Popover>
            <Autocomplete.Options>
              {filteredOptions.map(option => (
                <Autocomplete.Option key={option.value} option={option} />
              ))}
            </Autocomplete.Options>
          </Autocomplete.Popover>
        </Autocomplete.Root>
      </div>
    );
  },
};

export const GroupedOptions: StoryObj<typeof Autocomplete> = {
  render: () => {
    const [inputValue, setInputValue] = useState('');

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;

      setInputValue(value);
    };

    const filteredOptions = useMemo(() => {
      const search = inputValue.toLowerCase();

      const filteredEntries = [...groupedOptions.entries()]
        .map(([group, options]) => {
          const matchedOptions = options.filter(op =>
            op.label.toLowerCase().includes(search)
          );
          return [group, matchedOptions] as [string, typeof options];
        })
        .filter(([_, matchedOptions]) => matchedOptions.length > 0);

      return new Map(filteredEntries);
    }, [inputValue]);

    return (
      <div className="flex items-center h-[200px] w-[400px]">
        <Autocomplete.Root>
          <Autocomplete.Trigger inputValue={inputValue} onChange={onChange} />
          <Autocomplete.Popover>
            <Autocomplete.GroupedOptions
              groupedLabelExtractor={labelGroup => labelGroup}
              options={filteredOptions}
            />
          </Autocomplete.Popover>
        </Autocomplete.Root>
      </div>
    );
  },
};

type User = { id: number; name: string };

export const Lazy: StoryObj<typeof Autocomplete> = {
  render: () => {
    const [searchParam, setSearchParam] = useState('');

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;

      setSearchParam(value);
    };

    const fetchUsers = async () => {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/users',
        {
          method: 'GET',
        }
      );
      return (await response.json()) as User[];
    };

    const fetchPromise: () => Promise<Option[]> = useCallback(async () => {
      const dataTest = await fetchUsers();
      return (dataTest || [])
        .map(item => ({
          value: item.id.toString(),
          label: item.name,
        }))
        .filter(value => {
          if (searchParam)
            return value.label
              .toLowerCase()
              .includes(searchParam.toLowerCase());
          else return true;
        });
    }, [searchParam]);

    return (
      <div className="flex items-center h-[200px] w-[400px]">
        <Autocomplete.Root>
          <Autocomplete.Trigger inputValue={searchParam} onChange={onChange} />
          <Autocomplete.Popover>
            <Autocomplete.Options options={fetchPromise} />
          </Autocomplete.Popover>
        </Autocomplete.Root>
      </div>
    );
  },
};

export const LazyGrouped: StoryObj<typeof Autocomplete> = {
  render: () => {
    const [searchParam, setSearchParam] = useState('');

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;

      setSearchParam(value);
    };
    const fetchUsers = async () => {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/users',
        {
          method: 'GET',
        }
      );
      return (await response.json()) as User[];
    };

    const fetchPromise: () => Promise<Map<string, Option[]>> =
      useCallback(async () => {
        const dataTest = await fetchUsers();
        const map = new Map<string, Option[]>();
        dataTest.forEach(value => {
          if (
            searchParam &&
            !value.name.toLowerCase().includes(searchParam.toLowerCase())
          )
            return;
          const group = `Group ${(value.id % 3) + 1}`;
          const updatedValue = [
            ...(map.get(group) ?? []),
            {
              value: value.id.toString(),
              label: value.name,
            },
          ];
          map.set(group, updatedValue);
        });
        return map;
      }, [searchParam]);

    return (
      <div className="flex items-center h-[200px] w-[400px]">
        <Autocomplete.Root>
          <Autocomplete.Trigger inputValue={searchParam} onChange={onChange} />
          <Autocomplete.Popover>
            <Autocomplete.GroupedOptions
              groupedLabelExtractor={labelGroup => labelGroup}
              options={fetchPromise}
            />
          </Autocomplete.Popover>
        </Autocomplete.Root>
      </div>
    );
  },
};
