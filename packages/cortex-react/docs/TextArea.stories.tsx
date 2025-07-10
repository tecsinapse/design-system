import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { IoEye, IoPerson } from 'react-icons/io5';
import { TextArea } from '../src/components/TextArea';

export default {
  title: 'Cortex/Text Area',
  component: TextArea.Root,
  subcomponents: {
    Face: TextArea.Face,
    Box: TextArea.Box,
    Left: TextArea.Left,
    Right: TextArea.Right,
  },
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

export const Custom: StoryObj<typeof TextArea.Face & typeof TextArea.Box> = {
  args: { rows: 6, label: 'TextArea' },
  render: args => (
    <TextArea.Face>
      <TextArea.Left>
        <IoPerson size={16} />
      </TextArea.Left>
      <TextArea.Box
        label={args.label}
        placeholder={args.placeholder}
        rows={args.rows}
      ></TextArea.Box>
      <TextArea.Right>
        <IoEye />
      </TextArea.Right>
    </TextArea.Face>
  ),
};
