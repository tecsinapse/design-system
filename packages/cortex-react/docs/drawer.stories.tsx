import React, { useState } from 'react';
import { StoryFn } from '@storybook/react';
import { button, drawer, overlay } from '../../cortex-core/src';

export default {
  title: 'Cortex/Drawer',
  component: <div />,
  argTypes: {
    position: {
      options: ['left', 'right'],
      control: { type: 'radio' },
    },
  },
};

const Template: StoryFn = args => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex">
      <input
        type="checkbox"
        id="drawer-toggle"
        className="sr-only"
        onChange={() => setOpen(!open)}
      />
      <label
        htmlFor={'drawer-toggle'}
        className={button({
          intent: 'primary',
          className: 'flex justify-center items-center',
        })}
      >
        <p>Open/close drawer</p>
      </label>
      <div
        className={overlay({ show: open })}
        onClick={() => setOpen(false)}
      ></div>
      <div
        className={drawer({
          position: args.position,
          open: open,
        })}
      >
        <div className={'w-72'}>Content drawer</div>
      </div>
    </div>
  );
};

export const Base = {
  render: Template,
  args: {},
};
