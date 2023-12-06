import React from 'react';
import { StoryFn } from '@storybook/react';
import { labelRadioButton, radioButton } from '@tecsinapse/cortex-core';

export default {
  title: 'Lab/Radio Button',
  component: <div />,
};

const Template: StoryFn = () => {
  return (
    <div className={'gap-mili flex items-center justify-center'}>
      <input id={'radio'} type={'radio'} className={radioButton()}></input>
      <label htmlFor={'radio'} className={labelRadioButton()}>
        Radio Button
      </label>
    </div>
  );
};

export const Base = Template.bind({});

Base.args = {};
