import { Meta, StoryObj } from '@storybook/react';
import React, { useMemo, useState } from 'react';
import { selectOptions } from './autocompleteMocks';
import { Autocomplete } from '../src';

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
