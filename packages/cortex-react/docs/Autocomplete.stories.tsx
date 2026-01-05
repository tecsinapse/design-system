import { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Autocomplete } from '../src/components/Autocomplete/Autocomplete';
import { selectOptions } from './autocompleteMocks';

export default {
  title: 'Cortex/Autocomplete',
  component: Autocomplete,
} as Meta<typeof Autocomplete>;

export const Default: StoryObj<typeof Autocomplete> = {
  render: () => {
    const [value, setValue] = useState('');

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;

      setValue(value);
    };

    return (
      <div className="flex items-center h-[200px] w-[400px]">
        <Autocomplete
          inputValue={value}
          setInputValue={setValue}
          onChange={onChange}
          options={selectOptions}
        />
      </div>
    );
  },
};
