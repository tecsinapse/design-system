import { Meta, StoryObj } from '@storybook/react';
import React, { useId, useState } from 'react';
import { ColorPicker } from '../src';

type ColorPickerType = typeof ColorPicker.Root;
export default {
  title: 'Cortex/Color Picker',
  component: ColorPicker.Root,
} as Meta<ColorPickerType>;

export const Default: StoryObj<ColorPickerType> = {
  args: {
    defaultValue: '#f89907',
    disabled: false,
  },
  render: args => (
    <div className="bg-[#0E0E0E] w-[300px] h-[300px] flex justify-center items-center">
      <ColorPicker.Root
        defaultValue={args.defaultValue}
        disabled={args.disabled}
      />
    </div>
  ),
};

export const Composed: StoryObj<ColorPickerType> = {
  args: {
    value: '#f89907',
  },
  render: args => {
    const [color, setColor] = useState(args.value);
    const id = useId();
    return (
      <ColorPicker.Face>
        <ColorPicker.Box
          id={id}
          value={color}
          onChange={e => {
            console.log(e.target.value);
            setColor(e.target.value);
          }}
        />
        <ColorPicker.Label id={id}>{color}</ColorPicker.Label>
      </ColorPicker.Face>
    );
  },
};
