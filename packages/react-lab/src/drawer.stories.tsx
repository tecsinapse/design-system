import React from 'react';
import { StoryFn } from '@storybook/react';
import {
  button,
  drawer,
  overlay,
} from '@tecsinapse/cortex-core/src/components';
export default {
  title: 'Lab/Drawer',
  component: <div />,
  argTypes: {
    position: {
      options: ['left', 'right'],
      control: { type: 'radio' },
    },
  },
};

const Template: StoryFn = args => {
  return (
    <div className="flex">
      <input type="checkbox" id="drawer-toggle" className="sr-only peer" />
      <label
        htmlFor={'drawer-toggle'}
        className={button({
          intent: 'primary',
          className: 'flex justify-center items-center',
        })}
      >
        <p>Open/close drawer</p>
      </label>
      <label className={overlay()} htmlFor={'drawer-toggle'}></label>
      <div
        className={drawer({
          position: args.position,
        })}
      >
        <div className={'w-72'}>Content drawer</div>
      </div>
    </div>
  );
};

export const Base = Template.bind({});

Base.args = {};
