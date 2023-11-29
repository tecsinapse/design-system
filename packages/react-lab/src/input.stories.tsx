import React from 'react';
import { Story } from '@storybook/react';
import { input, inputBox, labelStyle } from '@tecsinapse/cortex-core';

export default {
  title: 'Lab/Input',
  component: <input />,
};

const Template: Story = () => {
  return (
    <div
      className={input({
        intent: 'error',
      })}
    >
      <div className={'flex w-full flex-col'}>
        <input
          className={inputBox('placeholder', 'label')}
          placeholder={'placeholder'}
        />
        <label
          className={labelStyle({
            intent: 'error',
            placeholder: 'placeholder',
          })}
        >
          label
        </label>
      </div>
    </div>
  );
};

export const Base = Template.bind({});

Base.args = {};
