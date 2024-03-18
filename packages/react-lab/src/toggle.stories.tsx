import React from 'react';
import { StoryFn } from '@storybook/react';
import {
  styleInputElement,
  styleLabelElement,
  toggle,
} from '@tecsinapse/cortex-core';

export default {
  title: 'Lab/Toggle',
  component: <div />,
};

const Template: StoryFn = () => {
  return (
    <div>
      <label className={styleLabelElement()}>
        <input type="checkbox" className={styleInputElement()} />
        <div className={toggle()} />
      </label>
    </div>
  );
};

export const Base = Template.bind({});

Base.args = {};
