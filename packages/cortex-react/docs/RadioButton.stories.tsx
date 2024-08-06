import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { RadioButton } from '../src/components';

export default {
  title: 'Cortex/Radio Button',
  component: RadioButton,
} as Meta<typeof RadioButton>;

export const Default: StoryObj<typeof RadioButton> = {
  render: args => (
    <>
      <RadioButton
        id={'default1'}
        label={args.label}
        reversed={args.reversed}
      />
    </>
  ),
  args: {
    label: undefined,
    reversed: false,
  },
};

export const Labeled = {
  render: args => (
    <RadioButton label={args.label} id={'labeled1'} reversed={args.reversed} />
  ),
  args: {
    label: 'Option 1',
    reversed: false,
  },
};

export const Grouped = {
  render: args => (
    <div className="flex flex-col gap-y-deca">
      <div className="flex flex-col items-start">
        <span>Group 1</span>
        <RadioButton
          label={args.label1}
          id={'opt1'}
          name={'group1'}
          reversed={args.reversed1}
        />
        <RadioButton
          label={args.label2}
          id={'opt2'}
          name={'group1'}
          reversed={args.reversed2}
        />
        <RadioButton
          label={args.label3}
          id={'opt3'}
          name={'group1'}
          reversed={args.reversed3}
        />
      </div>

      <div className="flex flex-col items-start">
        <span>Group 2</span>
        <RadioButton
          label={args.label4}
          id={'opt4'}
          name={'group2'}
          reversed={args.reversed4}
        />
        <RadioButton
          label={args.label5}
          id={'opt5'}
          name={'group2'}
          reversed={args.reversed5}
        />
        <RadioButton
          label={args.label6}
          id={'opt6'}
          name={'group2'}
          reversed={args.reversed6}
        />
      </div>
    </div>
  ),
  args: {
    label1: 'Option 1',
    reversed1: false,
    label2: 'Option 2',
    reversed2: false,
    label3: 'Option 3',
    reversed3: false,
    label4: 'Option 4',
    reversed4: false,
    label5: 'Option 5',
    reversed5: false,
    label6: 'Option 6',
    reversed6: false,
  },
};
