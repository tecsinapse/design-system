import { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { TextArea } from '../src';

export default {
  title: 'Cortex/TextArea',
  component: TextArea.Root,
} as Meta<typeof TextArea.Root>;

export const Default: StoryObj<typeof TextArea.Root> = {
  args: {
    rows: 6,
    label: 'TextArea',
  },
  render: args => {
    const [value, setValue] = useState('');
    return (
      <div className={'w-[300px]'}>
        <TextArea.Root
          placeholder={args.placeholder}
          label={args.label}
          variants={args.variants}
          rows={args.rows}
          value={value}
          onChange={e => setValue(e.currentTarget.value)}
        />
      </div>
    );
  },
};
