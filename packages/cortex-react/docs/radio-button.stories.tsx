import React from 'react';
import { StoryFn } from '@storybook/react';
import { labelRadioButton, radioButton } from '../../cortex-core/src';

export default {
  title: 'Cortex/Radio Button',
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

export const Base = {
  render: Template,
  args: {},
};
