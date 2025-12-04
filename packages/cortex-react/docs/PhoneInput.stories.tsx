import { Meta, StoryObj } from '@storybook/react';
import { PhoneInput } from '../src/components/PhoneInput';
import { useState } from 'react';

export default {
  title: 'Cortex/Phone Input',
  component: PhoneInput.Root,
  subcomponents: {
    Popover: PhoneInput.Popover,
    Trigger: PhoneInput.Trigger,
    Option: PhoneInput.Option,
    Options: PhoneInput.Options,
  },
} as Meta<typeof PhoneInput.Root>;

export const Default: StoryObj<typeof PhoneInput> = {
  render: () => {
    const [value, setValue] = useState('');

    return (
      <div className="flex items-center h-[200px] w-[400px]">
        <PhoneInput.Root
          defaultCountry="br"
          onChange={newValue => {
            setValue(newValue.inputValue);
          }}
          value={value}
        >
          <PhoneInput.Trigger />
          <PhoneInput.Popover>
            <PhoneInput.Options />
          </PhoneInput.Popover>
        </PhoneInput.Root>
      </div>
    );
  },
};
