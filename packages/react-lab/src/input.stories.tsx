import React from 'react';
import { StoryFn } from '@storybook/react';
import {
  input,
  inputBox,
  labelStyle,
} from '@tecsinapse/cortex-core/src/components';

export default {
  title: 'Lab/Input',
  component: <input />,
  argTypes: {
    intent: {
      options: ['default', 'success', 'warning', 'error'],
      control: { type: 'select' },
    },
  },
};

const Template: StoryFn = args => {
  return (
    <div
      className={input({
        intent: args.intent,
      })}
    >
      <div className={'flex w-full flex-col'}>
        <input
          className={inputBox(args.placeholder, args.label)}
          placeholder={args.placeholder}
        />
        <label
          className={labelStyle({
            intent: args.intent,
            placeholder: args.placeholder,
          })}
        >
          {args.label}
        </label>
      </div>
    </div>
  );
};

export const Base = Template.bind({});

Base.args = {
  label: 'Label',
  placeholder: 'Placeholder',
};
