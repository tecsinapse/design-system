import { Meta, StoryObj } from '@storybook/react';
import { PhoneInput } from '../src/components/PhoneInput';

export default {
  title: 'Cortex/Phone Input',
  component: PhoneInput,
} as Meta<typeof PhoneInput>;

export const Default: StoryObj<typeof PhoneInput> = {
  render: () => {
    return <PhoneInput />;
  },
};
